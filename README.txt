# Plant Distribution — Frontend (Static/PWA)

This is a ready static frontend for Plant Distribution. It connects to your backend:
- API_BASE: https://new-plant-n9jj.onrender.com

## Endpoints expected on backend
- `GET /api/health` — health check
- `POST /api/distribute` — create a distribution (body: aadhaar, method, qty, price, total, timestamp)
- `GET /api/distributions` — list all distributions

> Enable CORS on the backend (app.use(require('cors')())).

## Deploy (Netlify - easiest)
1. Zip the contents of this folder (all files).
2. Go to https://app.netlify.com/ → New site from Git → or Drag & Drop folder.
3. Netlify will give you a public URL like https://your-site.netlify.app

## Deploy (Render Static Site)
1. New → Static Site.
2. Connect Git or drag-drop this folder.
3. Publish → get a URL like https://plant-frontend.onrender.com

## Use in APK Builders
Paste your Frontend URL into:
- https://appmaker.xyz/pwa-to-apk/
- https://appsgeyser.com/create/url-to-app/
- https://webintoapp.com/

