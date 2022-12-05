FROM node:slim as base

WORKDIR /nodeAPI

COPY API .

# COPY API/package.json package.json
# COPY API/package-lock.json package-lock.json
# COPY API/tests tests

# FROM base as test
# RUN npm ci

# FROM base as prod
# RUN npm ci --production
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
RUN npm i --save-dev supertest 
RUN npm i --save-dev @types/supertest
RUN npm i nyc

# hack, et allolevad käsud joostaks cachimata
ADD "https://8.8.8.8" skipcache

RUN npm test

CMD ["npm", "start"]