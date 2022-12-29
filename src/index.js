// Core packages, no need to install
const fs = require("fs");
const path = require("path");
const {execSync} = require("child_process");

// YARN or npm packages, need to install
const express = require("express");
const morgan = require("morgan");

// App definition
const app = express();
const router = express.Router();

// App settings
const format = process.env.NODE_ENV === "development" ? "dev" : "combined";
const root = process.env.NODE_ROOT || "/src";
const timeout = process.env.NODE_TIMEOUT * 60000 || 600000;
const git = path.join("/", "usr", "bin", "git");

app.set("port", process.env.NODE_PORT || 3000);

// App check - if we don't have ghostscript, lets stop and warn the ops guy to install it
if (!fs.existsSync(git)) throw new Error("You must install Git first");

// Middlewares
app.use(morgan(format));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Healthy check
app.use(root, router.get("/ping", (_req, res) => {
  res.status(200);
  return res.json(response("pong", true, 0));
}));

// pull: you should pass repository name on the body ==> { repository: 'repo-dir' }
app.use(root, router.post("/pull", (req, res) => {
  // Payload expected
  if (!req.body.file) {
    res.status(400);
    return res.json(response("bad request (missing repository)", false, 0));
  }

  const repository = path.join(root, req.body.repository);

  if (fs.existsSync(repository)) {
    const start = Date.now();
    try {
      const reset = `${git} reset --hard`;
      const pull = `${git} pull`;
      execSync(reset, {stdio: "ignore", timeout, path: repository});
      execSync(pull, {stdio: "ignore", timeout, path: repository});
      res.status(200);
      return res.json(response(repository, true, time(start)));
    } catch (err) {
      res.status(507);
      return res.json(response(err, false, time(start)));
    }
  }

  res.status(404);
  return res.json(response("repository not found", false, 0));
}));

function time(start) {
  return (Date.now() - start) / 1000;
}

function response(message, success, time) {
  if (typeof message === "object") message = JSON.stringify(message);
  return {message, success, time};
}

// Start the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
