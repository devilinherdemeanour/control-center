# Aslan İsmayılov and Partners

Hüquq firması üçün ictimai sayt + admin panel.

- **Frontend:** Angular 14
- **Backend:** Node.js (Express)
- **Storage:** JSON fayllar (`backend/data/`)

## Modullar

### İctimai sayt
- Ana səhifə, Haqqımızda, Xidmətlər, Komanda (vəkillər), Bloq (xəbərlər), Əlaqə (xəritə ilə)

### Admin (`/admin`)
| Modul | Yol | Sahələr |
|-------|-----|---------|
| Xəbərlər | `/admin/xeberler` | ad, qısa ad, cover şəkil, ətraflı məzmun |
| Xidmətlər | `/admin/xidmetler` | ad, ətraflı məzmun (editor) |
| Vəkillər | `/admin/vekiller` | ad, soyad, istiqamət, ətraflı məlumat |
| Əlaqə | `/admin/elaqe` | telefon, e-poçt, ünvan, iş saatları, xəritə, sosial |
| İstifadəçilər | `/admin/istifadeciler` | yalnız admin: username + şifrə |

**Login:** `admin` / `admin123` → `/admin/login`

## İşə salma

```bash
npm run install:all

# API — http://127.0.0.1:4521
npm run start:api

# Angular — http://127.0.0.1:4317
npm run start:web
```

Bir prosesdə (build + API + UI):

```bash
npm run build
PORT=4535 npm run start:api
# http://127.0.0.1:4535
```

## API

| Path | Təsvir |
|------|--------|
| `POST /api/users/login` | Admin giriş |
| `GET/POST/PUT/DELETE /api/news` | Xəbərlər |
| `GET/POST/PUT/DELETE /api/services` | Xidmətlər |
| `GET/POST/PUT/DELETE /api/lawyers` | Vəkillər |
| `GET/PUT /api/contact` | Əlaqə |
| `GET/POST/PUT/DELETE /api/users` | Admin istifadəçilər (JWT) |

Yazma əməliyyatları JWT tələb edir (`Authorization: Bearer …`).

## Data faylları

`backend/data/news.json`, `services.json`, `lawyers.json`, `contact.json`, `users.json`, `about.json`, `settings.json`
