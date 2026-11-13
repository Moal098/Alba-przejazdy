# ALBA – Przejazdy prywatne (prototyp PWA, wersja 0.10)

Prototyp aplikacji do zgłaszania przejazdów prywatnych samochodem służbowym
i rozliczania paliwa według normy. Działa na Androidzie i iOS, instaluje się
z przeglądarki na ekran główny i pracuje bez połączenia z internetem.

## Zawartość paczki

| Plik | Rola |
|---|---|
| index.html | cała aplikacja (widoki kierowcy i rozliczającego) |
| manifest.webmanifest | nazwa, ikony i kolory aplikacji po instalacji |
| sw.js | service worker: zapis plików w pamięci telefonu, praca offline, aktualizacje |
| xlsx.full.min.js | biblioteka SheetJS 0.18.5 do eksportu do Excela (lokalnie, działa offline) |
| icon-*.png, apple-touch-icon.png | ikony aplikacji (sygnet ALBA na granatowym tle) |

## Uruchomienie do testów na telefonie

PWA wymaga adresu HTTPS. Pliki trzeba umieścić na dowolnym serwerze HTTPS,
wszystkie w jednym folderze. Nie nadaje się do tego biblioteka SharePoint,
bo nie serwuje stron HTML jako aplikacji.

**GitHub Pages (najprościej do testów)**
1. Utwórz repozytorium na GitHub i wgraj do niego wszystkie pliki z paczki.
2. Settings → Pages → Source: „Deploy from a branch”, gałąź `main`, folder `/ (root)`.
3. Po chwili aplikacja będzie dostępna pod adresem `https://<konto>.github.io/<repozytorium>/`.

**Azure Static Web Apps (docelowo, w środowisku firmowym)**
Utwórz zasób Static Web App (plan Free) i wgraj pliki. Ten sam hosting posłuży
później wersji podłączonej do SharePoint i logowania Microsoft.

**Szybki test na komputerze:** w folderze z plikami uruchom
`python -m http.server 8000` i otwórz `http://localhost:8000`.
Na telefonie adres z komputera w sieci lokalnej nie wystarczy, bo nie jest HTTPS.

## Instalacja na telefonie

- **Android (Chrome):** otwórz adres, w menu konta w aplikacji stuknij
  „Zainstaluj aplikację na telefonie” albo w menu Chrome wybierz „Zainstaluj aplikację”.
- **iPhone (Safari):** otwórz adres w Safari, stuknij Udostępnij → „Do ekranu początkowego”.
  Inne przeglądarki na iOS nie instalują PWA.

Po pierwszym uruchomieniu aplikacja działa także w trybie samolotowym.

## Dane symulacyjne

Aplikacja startuje z symulacją od lipca do początku listopada 2026: 8 kierowców, 8 samochodów
przydzielonych na stałe, 2 samochody z puli (opiekunowie: Tomasz Wróbel i Katarzyna Lis) oraz
rozliczająca Ewa Zając. Lipiec, sierpień i wrzesień są zamknięte, październik czeka na decyzje,
listopad jest bieżący. Stany licznika liczone są dzień po dniu, więc przebiegi, udziały i salda
w raportach są ze sobą spójne. Wśród danych jest 11 niezgłoszonych przejazdów dodanych przez
rozliczającą, brakujące stany licznika za październik, wpisy po terminie i odrzucone paragony.

Po aktualizacji z wersji 0.3 lub starszej dane testowe zastępowane są jednorazowo symulacją.

## Co przetestować

1. Zaloguj się jako kierowca (np. Anna Kowalczyk): zgłoś przejazd, dodaj tankowanie
   ze zdjęciem paragonu z aparatu, podaj stan licznika na koniec miesiąca.
2. Przełącz konto (menu pod inicjałami) na Ewę Zając (rozliczająca): zaakceptuj lub odrzuć
   wpisy, sprawdź raport pojazdów i ranking niezgłoszonych przejazdów, pobierz „Raport zbiorczy (Excel)”
   (jeden plik z 11 arkuszami; na telefonie otworzy się menu udostępniania: Poczta, Teams, OneDrive, Pliki).
3. Włącz tryb samolotowy i sprawdź, że aplikacja nadal działa.

## Ograniczenia prototypu

- Logowanie jest symulowane (konta testowe), a dane zapisują się tylko na tym telefonie.
  Wpisy z jednego telefonu nie są widoczne na innym, więc obie role testuje się na tym
  samym urządzeniu, przełączając konto.
- Przypomnienia mailem i w Teams są tylko podglądem; wysyła je dopiero Power Automate
  w wersji docelowej.
- Ikony powstały z wycięcia sygnetu z logo. Przed wdrożeniem warto podmienić je na
  oficjalny sygnet od działu marketingu.

## Aktualizacja wersji

Po zmianie któregokolwiek pliku podnieś numer w `sw.js` (stała `CACHE`, np. `alba-przejazdy-v0.2`)
i wgraj pliki ponownie. Zainstalowana aplikacja pokaże komunikat „Dostępna nowa wersja aplikacji”
z przyciskiem Odśwież.
