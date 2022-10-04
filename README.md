# API, kuhu tulemas peagi ka SQL ja ReactJS front end

## Käivitamisjuhis:
npm init -y
npm install typescript
npx tsc --init
npm install --save-dev ts-node nodemon
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
} > nodemon.json
"scripts": {
    "build": "tsc",
    "start": "nodemon"
} >> package.json

npm start

## API oskab töödelda:
<b>tagastame kõik vasted andmebaasist:<b>
<ul>
  <li>GET localhost:3000/api/v1/health
  <li>GET localhost:3000/api/v1/users
  <li>GET localhost:3000/api/v1/movies
  <li>GET localhost:3000/api/v1/tvseries
</ul>
<b>tagastame ainult päritu:<b>
<ul>
  <li>GET localhost:3000/api/v1/users/{username}
  <li>GET localhost:3000/api/v1/movies/{otsingufraas} - otsingufraas = üks tähemärk või täispikk pealkiri
  <li>GET localhost:3000/api/v1/tvseries/{otsingufraas} - otsingufraas = üks tähemärk või täispikk pealkiri
  <li>GET localhost:3000/api/v1/movies&id={id}
  <li>GET localhost:3000/api/v1/tvseries&id={id}
</ul>
<b>lisame uue sissekande:<b>
<ul>
  <li>POST localhost:3000/api/v1/users - tahab väljasid: email, username, password
  <li>POST localhost:3000/api/v1/movies - tahab väljasid: movieTitle, releaseYear, locationURI, price
  <li>POST localhost:3000/api/v1/tvseries - tahab väljasid: seriesTitle, releaseYear, episodes, locationURI, price
</ul>
<b>kustutame kirje:<b>
<ul>
  <li>DELETE localhost:3000/api/v1/users/{username}
  <li>DELETE localhost:3000/api/v1/movies&id={id}
  <li>DELETE localhost:3000/api/v1/tvseries&id={id}
</ul>

That's it folks!
