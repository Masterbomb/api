FROM node:14

LABEL version="1.0.0"
LABEL Christian Sargusingh "https://github.com/cSDes1gn"

# for global npm installs
ENV NPM_CONFIG_PREFIX=/opt/node/.npm-global

WORKDIR /home

EXPOSE 3000 

# Install app dependencies and build for production environment only
COPY . . 
RUN npm install
# RUN if [ "$NODE_ENV" == "development" ]; then \
#         npm install;  \
# 	else \
#         npm ci --only=production; \
# 	fi;
# always build a base dist
# RUN npm run build
