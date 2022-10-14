FROM node:slim as base

WORKDIR /nodeAPI
# COPY API /nodeAPI

RUN npm init -y
RUN npm i typescript
RUN npm i --save-dev @types/node
RUN npx tsc --init
RUN npm i --save-dev ts-node nodemon
RUN npm i dotenv
RUN npm i --save express
RUN npm i --save @types/express
RUN npm i cors
RUN npm i mariadb

# RUN apt-get update && apt-get install -y telnet

CMD ["npm", "start"]