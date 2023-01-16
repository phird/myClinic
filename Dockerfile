FROM node:15.13-alpine
WORKDIR /myclinic
COPY vite.config.js .
ENV PATH="./node_modules/.bin:$PATH"
COPY . . 
RUN yarn run build
CMD [ "yarn", "start"]

