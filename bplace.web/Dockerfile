####
# This Dockerfile is used in order to build a container that runs Angular
###
# Image de base
FROM node:14.15-alpine as builder

# Definition du workspace et copie code source
RUN mkdir /builder
WORKDIR /builder
COPY . /builder

# BUILD L'APPLICATION


# Image de base nginx
FROM nginx:1.23.1-alpine

#!/bin/sh

RUN rm -rf /usr/share/nginx/html/*

# COPIER LE CODE BUILD DANS NGINX (code source /builder/dist à copier dans /usr/share/nginx/html et /builder/nginx.conf à copier dans /etc/nginx/nginx.conf)


RUN chown root /usr/share/nginx/html/*
RUN chmod 755 /usr/share/nginx/html/*

# point d entre
ENTRYPOINT ["nginx", "-g", "daemon off;"]