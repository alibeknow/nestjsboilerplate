
FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS dist
COPY package.json yarn.lock package-lock.json ./
RUN yarn install
COPY . ./
RUN yarn install
RUN yarn build:prod
RUN yarn 

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
##### Added string ####
RUN yarn install 
CMD [ "yarn", "start" ]
EXPOSE 3000
