FROM registry.k10.kaztoll.kz/node:14-alpine3.12 AS dist

# Create app directory
#RUN mkdir -p /code

WORKDIR /code

# Installing dependencies
COPY . /code
COPY package.json yarn.lock /code/
#RUN yarn global add gulp && \
#RUN npm install && \
#RUN yarn build && \
#RUN yarn cache clean
RUN yarn global add gulp && \
    npm install && \
    yarn build && \
    yarn cache clean
CMD [ "yarn", "start" ]
EXPOSE 3000
