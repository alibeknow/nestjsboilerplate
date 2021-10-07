FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS dist
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY package-lock.json ./
RUN yarn install
COPY . ./src
RUN yarn build:prod

FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS node_modules
COPY package.json ./
COPY yarn.lock ./
COPY package-lock.json ./
RUN yarn install --prod

FROM registry.k10.kaztoll.kz/node:14-alpine3.12
ARG PORT=3000
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY package-lock.json ./
COPY --from=dist /usr/src/app/dist
COPY --from=node_modules /usr/src/app/node_modules
COPY . /usr/src/app
EXPOSE $PORT
CMD [ "yarn", "start:prod" ]



#FROM registry.k10.kaztoll.kz/node:14-alpine3.12
#ENV NODE_ENV=production
#ADD . /usr/src/app
#COPY package.json ./
#COPY yarn.lock ./
#COPY package-lock.json ./
#RUN yarn install --prod --offline && \ 
#    rm -rf .yarn_mirror && \
#    mv node_modules /tmp
#COPY . ./src
#RUN yarn build



#FROM registry.k10.kaztoll.kz/node:14-alpine3.12
#ENV NODE_ENV=production
#COPY --from=0 /tmp/node_modules /usr/src/app/node_modules
#COPY --from=0 /usr/src/app /usr/src/app
#EXPOSE 3000
#CMD [ "yarn", "start:prod" ]
