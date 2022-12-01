FROM node:18.12.1-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2

FROM nginx:latest

COPY --from=node /usr/src/app/dist/k10app-frontend /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
