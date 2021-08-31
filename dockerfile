FROM node:latest

RUN mkdir -p /usr/src/code
WORKDIR /usr/src/code

COPY package.json /usr/src/code

RUN npm install

COPY . /usr/src/code

CMD ["node", "./src/main/main.js"]