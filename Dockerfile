# Base image
FROM node:18 as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build


# production
FROM node:18.17.1-bullseye
WORKDIR /usr/src/app

# RUN apk update && \
#     apk add --no-cache tzdata

ENV TZ=Asia/Bangkok

# Install sharp with verbose logging
RUN npm install --ignore-scripts=false --foreground-scripts --verbose sharp

# Install sharp for the current linuxmusl-arm64v8 runtime
RUN npm install --platform=linuxmusl --arch=arm64v8 sharp

COPY --from=build /usr/src/app /usr/src/app

EXPOSE 3001

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]