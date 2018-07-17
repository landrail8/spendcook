FROM node:9
WORKDIR /web/
COPY . /web/
RUN yarn
RUN yarn build
EXPOSE 8080:8080