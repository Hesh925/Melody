FROM node:latest

RUN mkdir -p /usr/src/code
WORKDIR /usr/src/code

COPY package.json /usr/src/code

RUN npm install
RUN npm install pm2 -g

COPY . /usr/src/code

EXPOSE 80
EXPOSE 443

ENV PM2_PUBLIC_KEY 7tawny1y51pumwy
ENV PM2_SECRET_KEY eivv8ywec1om1pm

CMD ["pm2-runtime", "./src/main/main.js"]

#CMD ["node", "./src/main/main.js"]