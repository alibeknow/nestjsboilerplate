
FROM registry.k10.kaztoll.kz/node:14-alpine3.12

WORKDIR /usr/src/app
COPY package.json yarn.lock package-lock.json ./

RUN npm install
RUN npm run build:prod

COPY . .
CMD npm run start:prod 
EXPOSE 3000
