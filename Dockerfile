### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm build --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /src/app/dist/angular-app /share/nginx/html
EXPOSE 80