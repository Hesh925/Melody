FROM node:latest

RUN mkdir -p /usr/src/code
WORKDIR /usr/src/code

COPY package.json /usr/src/code

RUN npm install

COPY . /usr/src/code

EXPOSE 80
EXPOSE 443
CMD ["node", "./src/main/main.js"]