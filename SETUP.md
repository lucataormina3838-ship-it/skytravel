# Sky Travel – Guide de mise en place

## 1. Supabase

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Aller dans **SQL Editor** et coller le contenu de `supabase/migrations/001_initial.sql`
4. Copier vos clés API depuis **Settings > API**

## 2. Variables d'environnement

Éditer `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_SECRET=sky-travel-admin-2024
```

## 3. Resend (emails)

1. Créer un compte sur [resend.com](https://resend.com)
2. Ajouter et vérifier votre domaine (contact@sky-travel.fr)
3. Copier votre API key dans `.env.local`

> Pour tester sans domaine : utiliser `onboarding@resend.dev` comme expéditeur dans `src/lib/email.ts`

## 4. Lancer le projet

```bash
npm run dev
```

Ouvrir http://localhost:3000

## 5. Pages disponibles

| URL | Description |
|-----|-------------|
| `/fr` | Accueil en français |
| `/en` | Accueil en anglais |
| `/fr/apartments` | Liste des appartements |
| `/fr/apartments/[id]` | Détail + réservation |
| `/fr/packs` | Packs découverte |
| `/fr/packs/[id]` | Détail pack + réservation |
| `/fr/admin` | Dashboard admin |
| `/fr/admin/apartments` | Gestion appartements |
| `/fr/admin/packs` | Gestion packs |
| `/fr/admin/bookings` | Gestion réservations |

## 6. Accès admin

URL : `/fr/admin`
Mot de passe par défaut : `sky-travel-admin-2024`

> Changer dans `src/app/[locale]/admin/AdminLayoutClient.tsx` ligne 5

## 7. Déploiement (Vercel)

```bash
npx vercel
```

Ajouter les variables d'environnement dans le dashboard Vercel.

## 8. Structure du projet

```
src/
├── app/
│   ├── [locale]/          # Pages localisées (fr/en)
│   │   ├── page.tsx       # Accueil
│   │   ├── apartments/    # Appartements
│   │   ├── packs/         # Packs découverte
│   │   └── admin/         # Back-office
│   └── api/               # API routes
│       ├── bookings/      # CRUD réservations + email
│       ├── apartments/    # CRUD appartements
│       ├── packs/         # CRUD packs
│       └── upload/        # Upload photos Supabase Storage
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ApartmentCard.tsx
│   ├── PackCard.tsx
│   └── BookingCalendar.tsx
├── i18n/                  # Config next-intl
├── lib/
│   ├── supabase/          # Client Supabase
│   ├── email.ts           # Templates email Resend
│   ├── types.ts           # Types TypeScript
│   └── utils.ts
└── proxy.ts               # Middleware i18n
messages/
├── fr.json                # Traductions françaises
└── en.json                # Traductions anglaises
supabase/
└── migrations/
    └── 001_initial.sql    # Schéma DB + données de démo
```
