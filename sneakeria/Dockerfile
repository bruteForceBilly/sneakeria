FROM node:lts-alpine3.10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
ARG VUE_APP_API
ENV VUE_APP_API $VUE_APP_API
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf