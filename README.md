# zombies-api - simple CRUD REST API.

Aplikacja została zdeployowana na heroku:
https://zombies-api-jalowieckipiotr.herokuapp.com/

Dokumentacja dostępna pod adresem:
https://zombies-api-jalowieckipiotr.herokuapp.com/api-docs
W dokumentacji opisane zostały wszystkie endpointy, z parametrami, body oraz możliwymi responsami, dzięki wykorzystaniu swagger z poziomu strony dokumentacj możliwe jest odpytanie każdego z endpointów.

Aplikacja została stworzona przy użyciu Node.js + Express.
Na potrzeby aplikacji stworzona została nierelacyjna baza danych MongoDB, z która aplikacja łączy się za pomocą "mongoose". 
Wszelkie zmiany dokonane w endpointach wystawionych w aplikacji zostaną zapisane w bazie danych, nie utracimy ich nawet po ponownym buildzie.
Dane o produktach z "https://zombie-items-api.herokuapp.com/api/items" oraz o kursach wymiany walut z "http://api.nbp.pl/api/exchangerates/tables/C/today/" pobierane są cyklicznie codziennie o godzinie 00:00 z wykorzystaniem bibliotek "axios" oraz "node-cron", a następnie zapisywane w bazie danych aby niepotrzebnie nie odpytywać endpointów(dane o kursach EUR i USD trzymam też w zmiennych globalnych, aby uniknąć niepotrzebnych odczytów DB).

Z uwagi na to, że listę produktów odczytujemy z endpointu, założyłem, że dla ZOmbie można dodać tylko produkt z listy, w innym przypadku dostaniemy błąd, nie można też dodać więcej niż 5 produktów do jednego Zombie.
Url i dane logowania do bazy zapisywane są w zmiennych środowiskowych w pliku .env (oraz na heroku) z wykorzystaniem "dot-env".

Testy:
Testy zostały napisane z użyciem "jest" oraz "supertest".
Z braku czasu stworzone zostały tylko podstawowe testy (kody odpowiedzi) do niektórych endpointów.
Aby prawidłowo podejśc do tego zadania aplikacja powinna mieć możliwośc działania w trybie testowym (przerobienie app.js na funkcję i zasilanie odpowienimi argumentami na wejściu) gdzie przekazane zostałyby mockowe funkcje, które symulowałyby operacje na bazie danych. Dzięki temu moglibyśmy przetestować wszystkie pozostałe endpointy pod względem: zgodności parametrów wejściwoych, zachowania na różne argumenty na wejściu, sprawdzenie typów danych wejściowych i wyjściowych, ile razy wykonywane są operacje itd.)
Kolejnym usprawnieniem aplikacji powinno być zwróćenie uwagi na bezpieczeństwo i napisanie funkcji middleware do autentykacji użytkownika np. za pomocą BasicAuth.
Można też napisać middleware na wyjściu w celu ujednolicenia struktury odpowiedzi z endpointu.






