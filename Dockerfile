
FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS dist
COPY package.json yarn.lock package-lock.json ./
COPY . ./
RUN yarn install
RUN yarn build:prod


FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS node_modules
COPY . ./
COPY package.json yarn.lock package-lock.json ./
RUN yarn install --prod


FROM registry.k10.kaztoll.kz/node:14-alpine3.12
RUN mkdir -p /usr/src/app
RUN apk add net-tools
WORKDIR /usr/src/app
COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules  /usr/src/app/node_modules
COPY . /usr/src/app
#CMD [ "yarn", "start:prod" ]
#CMD npm install
#CMD yarn run build:prod 
RUN yarn run start:prod
EXPOSE 3000
