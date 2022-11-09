# Kairo TV - kooliprojekt (so far..)

## Esmakordne käivitus:
docker-compose build 
docker-compose up
## Dockerfile muutmise korral:
docker-compose down -v - kustutab olemasoleavad konteinerid
docker-compose up - kui pole muudatusi Dockerfiles jms..

### projektikaustas on vajalik .env faili olemasolu sisuga (Kasutajakontol on rohkem õigusi kui vaja):
DB_USER=exampleusername
DB_PASSWORD=examplepass
DB_NAME=exampledatabasename
SERVER_HOST=exampleserver
MARIADB_ROOT_PASSWORD=examplerootpw
APP_DB_USER=exampleuser
APP_DB_PASSWORD=examplepass
APP_DB_HOST=examplecontainername - docker-compose DB konteineri nimi
JWT_PASSWORD=examplestring/examplehash
SALT_ROUNDS=examplenumber

Eraldi tuleb teha fronti suhtluse jaoks DB kasutajakonto, millel on ainult tabeli piires õigused

## muid kasulikke käske
docker compose run service_name bash - service_name tuleneb defineeritud docker-compose.yml failist, käsk käivitab konteineri bashi

## API oskab töödelda:
### Enne igasugust tööd on vajalik ennast autentima, andmete muutmisel ja lisamisel on vajalik administraatori õigused
POST localhost:3000/api/v1/login - tahab väljasid: username, password  
GET localhost:3000/api/v1/token - tahab Authorization headerit JWT Tokeniga  
### peale login'i on vajalik kaasata iga päringuga "Authorization" header, mille väärtuseks tagastatud token
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

Kyssad  
Kuidas saaks HTML'i elemente "pikendada" reactiga?  
Kas terve App peab Reactis olema v saab ka teatud divid olla?

### TODO
.ENV_EXAMPLE luua  
Täpsustada, millega tegemist on  
Body äärtest tumedam, keskelt hele gradient
App.js left controls paremaga eraldi, et ei peaks kahest kohast eraldi muutma asju