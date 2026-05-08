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

## Roster

El roster intenta cargar la pestaña `raw_data` del Google Sheet de WoW Audit:

`https://docs.google.com/spreadsheets/d/1OUjSr5QwAuPJ9NMTbxH7etOj9-_SJFQxEpVVMLyeYXA/`

Si Google Sheets no responde, la app usa el ultimo roster cacheado en el navegador
o el mock local de `src/data/roster.ts`.

## Warcraft Logs

Links configurados:

- Guild overview: `https://www.warcraftlogs.com/guild/id/702025`
- Raid progress: `https://www.warcraftlogs.com/guild/progress/702025?zone=46`

El progress dinamico se genera en GitHub Actions cada 2 horas con Warcraft Logs
API/GraphQL y queda publicado como `data/progress.json`.

Para habilitar datos reales, crear un OAuth client en Warcraft Logs y agregar estos
secrets al repo:

- `WCL_CLIENT_ID`
- `WCL_CLIENT_SECRET`

Si los secrets no existen o la API falla, el workflow publica el fallback local.

## Integraciones futuras

- Raider.IO o Blizzard API para `src/data/progress.ts`
- Warcraft Logs para links de kills y wipes
- Discord OAuth para login de officers
- Discord webhook para avisos del dashboard
