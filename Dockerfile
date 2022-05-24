FROM node:alpine
COPY . /take-home
WORKDIR /take-home
RUN npm init -y
RUN npm install express body-parser mongoose --save
CMD node server.js