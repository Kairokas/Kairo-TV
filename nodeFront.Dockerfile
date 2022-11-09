FROM node:slim as base


RUN npx create-react-app public
# COPY API /nodeAPI
WORKDIR /public
RUN npm install --save chart.js react-chartjs-2
RUN npm install react-cookie
RUN npm install reactjs-popup --save

# RUN apt-get update && apt-get install -y telnet

CMD ["npm", "start"]