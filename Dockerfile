FROM node:14.17.3-alpine

WORKDIR server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start
