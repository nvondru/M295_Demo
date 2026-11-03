# M295_Demo

Test Doku


erDiagram
    users {
        INTEGER id PK "Primärschlüssel, automatisch"
        TEXT username "eindeutig (UNIQUE)"
        TEXT password "als bcrypt-Hash"
    }