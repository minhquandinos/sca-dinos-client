# Build frontend app
FROM node:14.15.4-alpine AS builder

WORKDIR /client

COPY package.json package.json
COPY package-lock.json package-lock.json

ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm install
RUN npm install -g @angular/cli@13.2.1

COPY . .
RUN ng build --prod


# Host frontend assets with nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /client/dist /srv/client
