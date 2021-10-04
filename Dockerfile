FROM registry.k10.kaztoll.kz/node:lts AS dist
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn build:prod


FROM registry.k10.kaztoll.kz/node:lts AS node_modules
COPY package.json ./
RUN yarn install --prod


FROM registry.k10.kaztoll.kz/node:lts
ARG PORT=3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules
COPY . /usr/src/app
EXPOSE $PORT
CMD [ "yarn", "start:prod" ]
