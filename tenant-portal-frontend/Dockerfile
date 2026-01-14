FROM node:22-alpine AS build-frontend

WORKDIR /build

RUN npm cache clean --force

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY ./ ./

RUN npm run build

FROM nginx:1-alpine

RUN echo $'server { \n\
    listen       80; \n\
    listen  [::]:80; \n\
    server_name  localhost; \n\
    location / { \n\
        root   /usr/share/nginx/html; \n\
        index  index.html index.htm; \n\
                try_files $uri$args $uri$args/ /index.html$args; \n\
                expires -1; \n\
    } \n\
    error_page   500 502 503 504  /50x.html; \n\
    location = /50x.html { \n\
        root   /usr/share/nginx/html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf;

COPY --from=build-frontend /build/www /usr/share/nginx/html