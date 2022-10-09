# API, kuhu tulemas peagi ka SQL ja ReactJS front end

## Käivitamisjuhis:
docker-compose build
docker-compose up

## API oskab töödelda:
### tagastame kõik vasted andmebaasist:
GET localhost:3000/api/v1/health
GET localhost:3000/api/v1/users
GET localhost:3000/api/v1/movies
GET localhost:3000/api/v1/tvseries
### tagastame ainult päritu:
GET localhost:3000/api/v1/users/{username}
GET localhost:3000/api/v1/movies/{otsingufraas} - otsingufraas = üks tähemärk või täispikk pealkiri
GET localhost:3000/api/v1/tvseries/{otsingufraas} - otsingufraas = üks tähemärk või täispikk pealkiri
GET localhost:3000/api/v1/movies&id={id}
GET localhost:3000/api/v1/tvseries&id={id}
### lisame uue sissekande
POST localhost:3000/api/v1/users - tahab väljasid: email, username, password
POST localhost:3000/api/v1/movies - tahab väljasid: movieTitle, releaseYear, locationURI, price
POST localhost:3000/api/v1/tvseries - tahab väljasid: seriesTitle, releaseYear, episodes, locationURI, price
### kustutame kirje
DELETE localhost:3000/api/v1/users/{username}
DELETE localhost:3000/api/v1/movies&id={id}
DELETE localhost:3000/api/v1/tvseries&id={id}

That's it folks!
