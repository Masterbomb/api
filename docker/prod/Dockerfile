FROM node:17-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:17-alpine AS server

LABEL version="1.0.0"
LABEL Christian Sargusingh "https://github.com/cSDes1gn"

WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/dist ./dist
EXPOSE 5000 
CMD ["npm", "run", "serve"]