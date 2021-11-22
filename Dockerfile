
FROM registry.k10.kaztoll.kz/node:14-alpine3.12
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY package.json yarn.lock package-lock.json ./
ENV TZ=Asia/Almaty

RUN npm install
RUN mkdir /usr/src/app/contracts
RUN mkdir /usr/src/app/logs
#RUN npm run build:prod
CMD npm run start:dev >> /usr/src/app/logs/kaztoll-enterprise-back.logs
EXPOSE 3000



