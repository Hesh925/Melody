FROM node:latest

RUN mkdir -p /usr/src/code
WORKDIR /usr/src/code

COPY package.json /usr/src/code
RUN apt update -y && apt install ffmpeg -y
RUN npm install
#RUN npm install pm2 -g

COPY . /usr/src/code

#EXPOSE 80
#EXPOSE 443

#CMD ["pm2-runtime", "./src/main/main.js"]

CMD ["node", "./src/main/main.js"]
