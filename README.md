# Scripts

## snap-home.ts

Generates a full-page screenshot of the ADEPT homepage.

### Usage

```bash
npm run snap:home
```

### Requirements

- Dev server must be running (`npm run dev`)
- Chromium will be installed automatically if not present

### Configuration

The script uses the following settings:

- **URL**: `http://localhost:3000/fr` (can be overridden with `APP_URL` env var)
- **Viewport**: 1440×900
- **Wait condition**: Network idle
- **Output**: `/public/preview-home.png`
- **Screenshot type**: Full-page

### Customization

To capture from a different URL or port:

```bash
APP_URL=http://localhost:3001 npm run snap:home
```

### Viewing the Screenshot

After generation, view the screenshot at:
- Direct file: `/public/preview-home.png`
- Preview page: `http://localhost:3000/fr/preview`
