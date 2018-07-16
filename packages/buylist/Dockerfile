FROM node:9
WORKDIR /web/
COPY . /web/
RUN yarn
RUN yarn build
ENTRYPOINT node
CMD ["app/server.js"]
EXPOSE 8080:8080