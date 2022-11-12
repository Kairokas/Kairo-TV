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
RUN npm i bcrypt
RUN npm i --save-dev @types/bcrypt
RUN npm i jsonwebtoken
RUN npm i --save-dev @types/jsonwebtoken
RUN npm i mocha
RUN npm i --save-dev @types/mocha
# kas ikka on chaid vaja?
RUN npm i chai
RUN npm i --save-dev @types/chai
RUN npm install --save-dev supertest 
RUN npm install --save-dev @types/supertest
RUN npm i nyc

# RUN apt-get update && apt-get install -y telnet

CMD ["npm", "start"]