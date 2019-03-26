FROM node:10

# Tini setup
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# App setup
COPY package*.json ./
RUN npm install --production
COPY lib lib
COPY data data
EXPOSE 8080
ENV NODE_ENV=production
CMD [ "node", "lib/webServer.js", "-and", "-its" ]