# 🌲 Muminkopedia API – Dokumentacja Architektury i Schematów Danych

Ten dokument stanowi centralne źródło prawdy dla architektury danych oraz kontraktów API Projektu "Muminkopedia", realizowanego dla Biura Ewidencji i Archiwizacji Doliny Muminków.

## 1. Modele Mongoose

### Model Postaci (`Character`)
Przechowuje informacje o mieszkańcach Doliny Muminków.

| Pole | Typ Danych Mongoose | Opis | Walidacja |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Imię postaci | Wymagane (`required: true`), unikalne, brak pustych znaków. |
| `description` | `String` | Krótki opis postaci | Wymagane. |
| `species` | `String` | Gatunek (np. Muminek, Miukk, Paszczak) | Wymagane. |
| `isSleeping` | `Boolean` | Czy postać śpi snem zimowym? | Wymagane. Domyślnie `false`. |
| `bestFriend` | `ObjectId` | Najlepszy przyjaciel (Relacja) | Opcjonalne. Referencja (ref) do modelu `Character`. |

### Model Artefaktu (`Artifact`)
Przechowuje informacje o magicznych przedmiotach i artefaktach.

| Pole | Typ Danych Mongoose | Opis | Walidacja |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Nazwa artefaktu | Wymagane. |
| `description` | `String` | Opis właściwości przedmiotu | Wymagane. |
| `owner` | `ObjectId` | Właściciel przedmiotu | Wymagane. Referencja (ref) do modelu `Character`. |

---

## 2. Plan Relacji i Logika Biznesowa (Dylemat Paszczaka)

### Typ Relacji:
Pole `owner` w modelu `Artifact` **musi być magicznym `ObjectId`** (Referencją Mongoose do `Character`), a nie zwykłym tekstem. Pozwala to na:
1. Pobieranie danych (Populate) – łatwe dołączenie pełnych informacji o właścicielu do zapytania o artefakt.
2. Utrzymanie spójności danych – właściciel musi faktycznie istnieć w bazie (walidacja na poziomie Serwisu/Repozytorium).

### Dylemat Paszczaka - Cykl Życia Artefaktu (On Delete Cascade):
Jeśli postać (właściciel) zostaje usunięta (np. wyjeżdża z Doliny), artefakty z nią powiązane wymagają odpowiedniego obsłużenia.
**Rozwiązanie:** W warstwie `CharacterService` (podczas usuwania Postaci) wprowadzona zostanie logika, która usuwa wszystkie artefakty należące do tej postaci (tzw. "zabiera je ze sobą").
Dodatkowo: Usunięcie postaci musi wyczyścić pole `bestFriend` u innych postaci, dla których usuwana postać była najlepszym przyjacielem.

---

## 3. Plan Endpointów (Kontrakty API)

Wszystkie odpowiedzi będą zwracane w standardowym formacie JSON z obsługą błędów odpowiednią dla przyszłego frontendu w React.

### Postaci (`/api/characters`)
- `GET /api/characters` – Pobiera listę wszystkich postaci.
- `GET /api/characters/:id` – Pobiera szczegóły konkretnej postaci (z rozwiązanym referencyjnie `bestFriend`).
- `POST /api/characters` – Rejestruje nową postać.
- `PUT /api/characters/:id` – Aktualizuje dane postaci (np. zmianę `isSleeping`).
- `DELETE /api/characters/:id` – Usuwa postać (oraz jej kaskadowe zależności).

### Artefakty (`/api/artifacts`)
- `GET /api/artifacts` – Pobiera listę artefaktów (z informacją o właścicielach).
- `GET /api/artifacts/:id` – Pobiera szczegóły artefaktu.
- `POST /api/artifacts` – Rejestruje nowy artefakt i przypisuje do właściciela.
- `PUT /api/artifacts/:id` – Aktualizuje dane artefaktu.
- `DELETE /api/artifacts/:id` – Niszczy artefakt.
