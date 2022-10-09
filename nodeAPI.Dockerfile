FROM node:slim as base

WORKDIR /nodeAPI
COPY package*.json /nodeAPI

#COPY . /

# production stage - tulevikus
# FROM base as production
# ENV NODE_ENV=production
# RUN npm install -g nodemon && npm install
FROM base as dev
# ENV NODE_ENV=development
RUN npm init -y
RUN npm install typescript
RUN npx tsc --init
RUN npm install --save-dev ts-node nodemon
# COPY /API /
CMD ["npm", "start"]