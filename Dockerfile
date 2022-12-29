FROM node:18

WORKDIR /app
COPY . .

RUN apt-get update \
 && apt install git \
 && chown node:node -R /app \
 && yarn deploy:prod

USER node
EXPOSE 3000

CMD ["yarn", "start"]
