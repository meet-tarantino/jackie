FROM node:8-alpine

COPY . /app

WORKDIR /app

CMD ["npm", "start"]