# Set base image to Node LTS (10.15.0 as of 2019-01-11) Alpine
FROM node:10.15.0-alpine

# Set working directory for application
WORKDIR /usr/src/app

# Copy package.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy webapp files to container
COPY . /usr/src/app/

# Expose default ports
EXPOSE 3000 8080