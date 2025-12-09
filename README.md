# Pogoda — aplikacja od zera

Minimalny start projektu pogody w React + Vite. Kod został wyczyszczony tak, abyś mógł/mogła budować od zera.

## Uruchomienie lokalne

```powershell
cd "C:\\Users\\majka\\Desktop\\Weather-app\\vite-project"
npm install
npm run dev
```

## Budowanie

```powershell
npm run build
```
Wynik w katalogu `dist/`.

## Deploy na GitHub Pages

Repozytorium: https://github.com/Majkan1/pogoda
Docelowy URL: https://majkan1.github.io/pogoda/

Deployment jest skonfigurowany przez GitHub Actions. Każdy push na `main` uruchomi build i publikację.

## Gdzie zacząć?
- Edytuj `src/App.jsx` — dodaj logikę i UI pogody
- Dodaj style w `src/App.css` lub globalnie w `src/index.css`
