# Set base image to Node LTS (10.15.0 as of 2019-01-28) Alpine
FROM node:10.15.0-alpine

# Add bash shell
RUN apk update && apk upgrade && apk add bash

# Set working directory for application
WORKDIR /usr/src/app

# Copy package.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy webapp files to container
COPY . /usr/src/app/

# Build production bundle
RUN npm run build:prod

# Expose default ports
EXPOSE 3000