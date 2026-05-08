# RageQuit Guild App

PWA mobile-first para una guild de World of Warcraft. La primera version no usa backend:
roster, progress, links, estrategias y recruitment viven en `src/data`.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Publicar como PWA instalable

La app queda lista para GitHub Pages. En el repo, activar:

1. `Settings` -> `Pages`
2. `Build and deployment` -> `Source: GitHub Actions`
3. Push a `main`

GitHub Actions compila `dist/` y publica la app por HTTPS. En Android/iPhone,
abrir la URL publicada y usar `Agregar a pantalla principal` o `Instalar app`.

## Integraciones futuras

- Google Sheets para `src/data/roster.ts`
- Raider.IO o Blizzard API para `src/data/progress.ts`
- Warcraft Logs para links de kills y wipes
- Discord OAuth para login de officers
- Discord webhook para avisos del dashboard
