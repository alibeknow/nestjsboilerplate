
FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS dist
COPY package.json yarn.lock package-lock.json ./
COPY . ./
RUN yarn install
RUN yarn build:prod


FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS node_modules
COPY . ./
COPY package.json yarn.lock package-lock.json ./
RUN yarn install 


FROM registry.k10.kaztoll.kz/node:14-alpine3.12
RUN mkdir -p /usr/src/app
RUN apk add net-tools telnet
WORKDIR /usr/src/app
COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules  /usr/src/app/node_modules
COPY . /usr/src/app
#CMD [ "yarn", "start:prod" ]
#RUN npm run build:prod
CMD npm run start:prod 
EXPOSE 3000
