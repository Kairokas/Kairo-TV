# API, kuhu tulemas peagi ka SQL ja ReactJS front end

## Esmakordne käivitus:
docker-compose build 
docker-compose up
## Dockerfile muutmise korral:
docker-compose down -v - kustutab volüümid, mis seotud konteineriga
docker-compose up - kui pole muudatusi Dockerfiles jms..

### projektikaustas on vajalik .env faili olemasolu sisuga (Kasutajakontol on rohkem õigusi kui vaja):
DB_USER=exampleusername
DB_PASSWORD=examplepass
DB_NAME=exmapledatabasename
SERVER_HOST=exampleserver
MARIADB_ROOT_PASSWORD=examplerootpw

Eraldi tuleb teha fronti suhtluse jaoks kasutajakonto, millel on ainult tabeli piires õigused

## muid kasulikke käske
docker compose run service_name bash - service_name tuleneb defineeritud docker-compose.yml failist, käsk käivitab konteineri bashi

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
