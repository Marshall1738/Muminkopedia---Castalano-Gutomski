# Muminkopedia – Schema Dokumentacja

Dokumentacja modeli **Character** i **Artifact** dla API Muminkopedia

---

## 1. Model Character

| Pole         | Typ       | Opis                                    | Wymagane  |
|--------------|----------|------------------------------------------|-----------|
| name         | string   | Imię postaci                             | ✅         |
| description  | string   | Krótki opis                              | ✅         |
| species      | string   | Gatunek (np. Muminek, Miukk, Paszczak)   | ✅         |
| isSleeping   | boolean  | Czy postać śpi snem zimowym?             | ✅         |
| bestFriend   | ObjectId | Referencja do innej postaci (opcjonalnie) | ❌         |

**Uwagi:**
- `bestFriend` będzie wskazywać na innego Character.
- Pole opcjonalne, bo nie każda postać musi mieć najlepszego przyjaciela.

---

## 2. Model Artifact

| Pole        | Typ       | Opis                                   | Wymagane |
|-------------|----------|----------------------------------------|-----------|
| name        | string   | Nazwa artefaktu                        | ✅        |
| description | string   | Opis właściwości                       | ✅        |
| owner       | ObjectId | ID właściciela (Character)             | ✅        |

**Uwagi:**
- Każdy artefakt należy do jednej postaci (`owner`).
- W przyszłości po usunięciu postaci należy obsłużyć artefakty (np. przypisać do `null` lub usunąć).

---

## 3. Relacje

- `Character.bestFriend → Character` (opcjonalne)
- `Artifact.owner → Character` (wymagane)

---

## 4. Plan endpointów

### Characters
- `POST /api/characters` – dodaj nową postać
- `GET /api/characters` – pobierz wszystkie postaci

### Artifacts
- `POST /api/artifacts` – dodaj nowy artefakt
- `GET /api/artifacts` – pobierz wszystkie artefakty