# GitShook

This microservice is aimed to sync git repositories by webhook

## Table of contents
1. [Architecture](#architecture)
2. [OS dependencies](#operational-system-dependencies)
   1. [How to build and run](#how-to-build-and-run)
      1. [On production](#on-production)
      2. [On development](#on-development)
3. [How to check healthy](#how-to-check-healthy)
4. [How to use](#how-to-use)
5. [How to contribute](#how-to-contribute)
6. [How to run it on Docker](#how-to-run-it-on-docker)
7. [Next steps](#next-steps)


## Architecture

TODO

## How to build and run

### On production

1. To build this to production you must export the env environments

    ```dotenv
    # Those are de default values if there's no env at all
    NODE_ENV=production
    NODE_PORT=3000
    ```

2. Install the dependencies and run
    ```bash
    $ yarn ci
    $ yarn start
    ### OUTPUT ###
    yarn run v1.22.17
    $ node src
    Server on port 3000
    ```

### On development

1. To build this to development you must export the env environments
    ```dotenv
    NODE_ENV=development
    NODE_PORT=3000
    ```

2. Install the dependencies and start in `nodemon` mode
    ```bash
    $ yarn dev
    ### OUTPUT ###
    yarn run v1.22.17
    $ yarn install && nodemon src
    [1/4] Resolving packages...
    success Already up-to-date.
    [nodemon] 2.0.20
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node src`
    Server on port 3000
    ```

## How to check healthy

Use this as container healthy check. To check if the API is healthy

```bash
$ curl -f localhost:3000/ping
### OUTPUT ###
{"message":"pong","success":true,"time":0}
```

## How to use

### Pull endpoint

TODO

### Checkout endpoint

TODO
 
## How to contribute

Let's keep the application as simple as possible by following the best practices for code style. We know every developer have your way, but when working together the code must have standards on the code style that must be followed by all.

To do this job, we relly on [ESlint](https://eslint.org/) and you should lint your application before the pull requests, otherwise your PR will be deleted. To do so, install `yarn dev` packages and work as usual. 

When you try to commit the code, the tool [Husky](https://www.npmjs.com/package/husky) will do a lint check and if it finds any error, your commit will be denied.

```bash
$ yarn install
### OUTPUT ###
yarn install v1.22.17
[1/4] Resolving packages...
success Already up-to-date.
Done in 0.22s.

$ git commit -m "test: checking if husky will block the commit due a unused const"
### OUTPUT ###
yarn run v1.22.17
$ eslint --ext js,jsx,ts,tsx .

/media/thyarles/LinuxData/bitcot/pdf-outliner/src/index.js
  22:7  error  'testLint' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky - pre-commit hook exited with code 1 (error)
```

So you need to look into do error, fix it and try another commit. The most common IDEs will warn you about those errors in real time.

Most of the code style errors can be automatically fixed, you just need to call like that:

```bash
$ yarn lint:format
### OUTPUT ###
yarn run v1.22.17
$ prettier --write '**/*.{ts,tsx,js,jsx,json}'
.eslintrc.json 54ms
package.json 7ms
src/index.js 73ms
Done in 0.51s.
```

## How to run it on Docker

If you believe in me and don't want to install a thing, just use the Docker image:

### Run in frontend mode (you can see the logs)
```bash
$ docker run --init -p 3000:3000 -v /git-src:/src/ thyarles/gitshook:latest
### OUTPUT ###
yarn run v1.22.19
$ node src
Server on port 3000
```

### Run in backend mode (you can't see the logs)
```bash
$ docker run --detach --restart unless-stopped --publish 3000:3000 --volume /git-src:/src/ thyarles/gitshook:latest
```

# Next steps
1. Enforce lint as branch protection on GitHub Actions (unfortunately Husky allow developer bypass local test, so best make sure)
2. Do static analysis check using [SonarCloud](https://sonarcloud.io) and block code with low quality gate, with any bugs or with any security issues
3. Add unit tests
4. Add integration tests
5. Block pull requests that doesn't meet the minimum of 60% of coverage using [SonarCloud](https://sonarcloud.io)
