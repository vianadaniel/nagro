FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn.lock ./

COPY .env ./

RUN npm install

RUN yarn

COPY ./build .

EXPOSE 5000

CMD ["node", "server.js"]