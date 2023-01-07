# Kairo TV - kooliprojekt (so far..)
Veebilehe eesmärk on videostriimimine sarnaselt Netflixile/Go3 vms..  
Antud lahenduses on kasutusel 3 erinevat teenust, mis jooksevad erikonteinerites: front-end (Node + React), API (Node Express) ja DB (MariaDB)

## Esmakordne käivitus:
*projektikaustas olev .envEXAMPLE tuleb muuta .env (PS: Kasutajakontol on rohkem õigusi kui vaja)  
*docker-compose build  
*docker-compose up  
*Eraldi tuleb teha fronti suhtluse jaoks DB kasutajakonto, millel on ainult tabeli piires õigused  
*db/data_generationis asuvad SQL käskud testandmete loomiseks  

## Dockerfile muutmise korral:
*docker-compose down -v - kustutab olemasolevad konteinerid  
*docker-compose up --build - kui pole varasemast alles konteinereid  

## muid kasulikke käske
*docker compose run service_name bash - service_name tuleneb defineeritud docker-compose.yml failist, käsk *käivitab ette antud konteineri bashi  
*docker-compose build --progress plain - testide jooksutamiseks kasutada seda (kuvab outputi käskudel)  

## API oskab töödelda:
### Enne igasugust tööd on vajalik ennast autentida. Andmete muutmisel ja lisamisel on vajalik administraatori õigused.
*POST localhost:3000/api/v1/login - tahab väljasid: username, password  
*GET localhost:3000/api/v1/token - tahab Authorization headerit JWT Tokeniga  
### peale login'i on vajalik kaasata iga päringuga "Authorization" header, mille väärtuseks tagastatud JWT token
### tagastame kõik vasted andmebaasist:
*GET localhost:3000/api/v1/health  
*GET localhost:3000/api/v1/users  
*GET localhost:3000/api/v1/userexists/{username}  
*GET localhost:3000/api/v1/movies  
*GET localhost:3000/api/v1/tvseries  
*GET localhost:3000/api/v1/usersroles  
### tagastame ainult päritu:
*GET localhost:3000/api/v1/users/{username}  
*GET localhost:3000/api/v1/movies/{otsingufraas} - otsingufraas = üks tähemärk või täispikk pealkiri  
*GET localhost:3000/api/v1/tvseries/{otsingufraas} - otsingufraas = üks tähemärk või täispikk pealkiri  
*GET localhost:3000/api/v1/movies&id={id}  
*GET localhost:3000/api/v1/tvseries&id={id}  
### lisame uue sissekande
*POST localhost:3000/api/v1/users - tahab väljasid: email, username, password  
*POST localhost:3000/api/v1/movies - tahab väljasid: movieTitle, releaseYear, locationURI, price  
*POST localhost:3000/api/v1/tvseries - tahab väljasid: seriesTitle, releaseYear, episodes, locationURI, price  
### kustutame kirje
*DELETE localhost:3000/api/v1/users/{username}  
*DELETE localhost:3000/api/v1/movies&id={id}  
*DELETE localhost:3000/api/v1/tvseries&id={id}  

That's it folks!  

### Kyssad  
Kuidas saaks HTML'i elemente "pikendada" reactiga?  

### TODO
Body äärtest tumedam, keskelt hele gradient  
Testandmebaasiga teste jooksutada (loo, testi, kustuta)  
CDN jms. tõsta projekti
