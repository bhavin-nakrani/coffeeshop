FROM node:16

WORKDIR /coffeeshop
COPY package.json .
RUN npm install
COPY . .
CMD npm start