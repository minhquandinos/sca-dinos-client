FROM node:14.15.4-alpine AS angular-builder

ARG NG_VERSION=13.2.1

WORKDIR /var/www/html

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=4096
RUN echo "NG_VERSION = ${NG_VERSION}"
RUN npm install
RUN npm install -g @angular/cli@${NG_VERSION}
