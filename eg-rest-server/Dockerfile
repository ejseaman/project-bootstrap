FROM node:16-alpine
WORKDIR /usr/src/rest-server

COPY package*.json ./
RUN npm ci # instead of install

COPY . .

EXPOSE 8080
CMD ["node", "index.js"]
