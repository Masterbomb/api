FROM node:14

LABEL version="1.0.0"
LABEL Christian Sargusingh "https://github.com/cSDes1gn"

# for global npm installs
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .
# RUN npm install
# If you are building your code for production
RUN npm ci 

# Bundle app source
COPY . . 
EXPOSE 3000 

# build the app
RUN npm run build

# At the end, set the user to use when running this image
USER node

CMD [ "node" , "."]