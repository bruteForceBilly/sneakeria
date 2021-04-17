FROM node:lts-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY ./ .
RUN yarn data-gen
CMD [ "node", "index.js" ]