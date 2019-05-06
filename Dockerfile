FROM node:10.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3002

CMD [ "npm", "start" ]