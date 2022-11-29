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

ENV baseUrl="https://b8b83cae-7bfe-4052-a97e-67fc7ea5acb3.mock.pstmn.io"
