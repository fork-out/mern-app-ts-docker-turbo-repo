FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV REACT_APP_BASE_URL=http://localhost:4000

CMD [ "yarn", "start" ]