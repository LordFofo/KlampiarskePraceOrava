# Klampiarske práce Orava

Webová stránka pre klampiarov z Oravy zaoberajúcich sa pokrytím striech plechom a montážou strešných okien.

## Technológie

| Vrstva | Technológia |
|--------|-------------|
| Backend | ASP.NET Core 9 Web API (C#) |
| Frontend | React 18 + Vite + TypeScript |
| UI | Tailwind CSS |
| Databáza | SQLite + Entity Framework Core 9 |
| Autentifikácia | JWT Bearer tokeny |

## Štruktúra projektu

```
KlampiarskePraceOrava/
├── KlampiarskePraceOrava.Api/        # ASP.NET Core Web API
│   ├── Controllers/
│   │   ├── AuthController.cs         # Prihlásenie admina
│   │   ├── ProjectsController.cs     # Verejné API
│   │   └── AdminProjectsController.cs# Admin CRUD (chránené JWT)
│   ├── Data/
│   │   ├── AppDbContext.cs
│   │   └── Models/
│   │       ├── Project.cs
│   │       ├── ProjectImage.cs
│   │       └── ProjectVideo.cs
│   ├── DTOs/
│   │   └── ProjectDtos.cs
│   └── appsettings.json
│
└── KlampiarskePraceOrava.Web/        # React + Vite frontend
    └── src/
        ├── pages/
        │   ├── Home.tsx              # Úvodná stránka
        │   ├── Projects.tsx          # Galéria projektov
        │   └── Contact.tsx           # Kontakt
        ├── admin/
        │   ├── Login.tsx             # Prihlásenie
        │   ├── AdminLayout.tsx       # Admin layout so sidebarem
        │   ├── Dashboard.tsx         # Zoznam projektov
        │   └── ProjectForm.tsx       # Formulár projektu + upload médií
        ├── components/
        │   └── Navbar.tsx
        ├── context/
        │   └── AuthContext.tsx
        └── services/
            └── api.ts
```

## Spustenie (development)

Stačí spustiť **iba API projekt** — ten automaticky naštartuje aj Vite dev server.

```bash
cd KlampiarskePraceOrava.Api
dotnet run
```

- Web: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:5000](http://localhost:5000)
- Admin: [http://localhost:5173/admin](http://localhost:5173/admin)

Vo **Visual Studio**: otvor `KlampiarskePraceOrava.sln` a stlač `F5`.

## Prihlasovacie údaje (admin)

```
Používateľské meno: admin
Heslo:             Admin1234!
```

> Zmeň credentials v `KlampiarskePraceOrava.Api/appsettings.json` pod kľúčom `Admin`.

## Funkcie

### Verejný web
- **Úvod** — hero sekcia, popis služieb, ukážka posledných projektov
- **Projekty** — galéria s filtrom podľa kategórie, lightbox s fotografiami a videami
- **Kontakt** — mená kontaktných osôb + odkaz na Facebook skupinu

### Admin panel (`/admin`)
- Prístupný iba cez priamu URL — žiadny odkaz na verejnom webe
- Pridávanie, úprava a mazanie projektov
- Upload obrázkov a krátkych videí (uložené ako BLOB v SQLite)
- Zapnutie / vypnutie viditeľnosti projektu (publish/unpublish)

### Kategórie projektov
- Pokrytie strechy
- Strešné okná

## Produkčný build

```bash
cd KlampiarskePraceOrava.Api
dotnet publish -c Release
```

Pri publishu sa automaticky zbuilduje React (`npm run build`) a súbory sa skopírujú do `wwwroot/`. API potom servuje celú aplikáciu na jednom porte.

## Databáza

SQLite súbor `klampiarske.db` sa vytvorí automaticky pri prvom spustení API. Migrácie sa aplikujú automaticky.
