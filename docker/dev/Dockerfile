FROM node:17-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

CMD ["npm", "run", "daemon"]