FROM node:15.13-alpine
WORKDIR /myclinic
ENV PATH="./node_modules/.bin:$PATH"
COPY . . 
RUN yarn run build
CMD [ "yarn", "start"]