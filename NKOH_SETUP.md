# Nkoh - Plateforme Radio-TV Camerounaise

Bienvenue sur **Nkoh**, une plateforme complète de streaming radio et télévision pour le Cameroun, construite avec Next.js 16, React 19, et NextAuth.js.

## 🚀 Vue d'ensemble

Nkoh est une application moderne de streaming en direct et à la demande avec les fonctionnalités suivantes:

- **Radio en direct** - Écoutez les stations de radio camerounaises en temps réel
- **Télévision** - Regardez les chaînes de télévision et les replays d'émissions
- **Presse** - Consultez les dernières actualités et articles
- **Authentification sécurisée** - Inscription et connexion avec NextAuth.js
- **Tableau de bord administrateur** - Supervision de la plateforme et des statistiques
- **Architecture évolutive** - Base de données Prisma ready, API RESTful modulaire

## 🛠️ Stack technologique

- **Frontend**: Next.js 16 avec React 19, Tailwind CSS 4, shadcn/ui
- **Backend**: Next.js API Routes, Server Components, Server Actions
- **Authentification**: NextAuth.js v4 avec Prisma Adapter
- **Base de données**: PostgreSQL (Neon ou autre)
- **Streaming**: HLS/DASH support, react-player
- **ORM**: Prisma 6
- **Validation**: Zod
- **Package manager**: pnpm

## 📁 Structure du projet

```
nkoh/
├── app/
│   ├── (auth)/              # Routes d'authentification
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/         # Routes protégées utilisateur
│   │   ├── dashboard/
│   │   ├── radio/
│   │   ├── tv/
│   │   └── press/
│   ├── (admin)/             # Routes administrateur
│   │   └── admin/
│   └── api/                 # API endpoints
│       ├── auth/
│       ├── streams/
│       └── articles/
├── components/
│   ├── media/               # Composants vidéo/audio
│   │   ├── radio-player.tsx
│   │   └── video-player.tsx
│   ├── navigation/
│   └── ui/                  # Composants shadcn/ui
├── lib/
│   ├── auth.ts              # Utilitaires d'authentification
│   ├── auth-config.ts       # Configuration NextAuth
│   ├── prisma.ts            # Client Prisma
│   └── api-response.ts      # Helpers API
├── prisma/
│   └── schema.prisma        # Schéma de base de données
└── public/                  # Assets statiques
```

## 🔧 Installation et configuration

### 1. Cloner le projet

```bash
git clone <repo-url>
cd nkoh
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` basé sur `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Éditer `.env.local` et configurer:

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/nkoh"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-secure-ici"

# Configuration session
SESSION_MAX_AGE=2592000

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 4. Générer le client Prisma

```bash
pnpm exec prisma generate
```

### 5. Créer la base de données

```bash
pnpm exec prisma db push
```

### 6. Démarrer le serveur de développement

```bash
pnpm dev
```

L'application sera disponible à `http://localhost:3000`

## 📊 Schéma de base de données

### Tables principales

- **User** - Utilisateurs avec authentification
- **Channel** - Chaînes (Radio, TV, News)
- **Show** - Émissions de radio/TV
- **Stream** - Flux de streaming en direct ou VOD
- **Episode** - Épisodes de séries/émissions
- **Article** - Articles de presse
- **Favorite** - Favoris des utilisateurs
- **PlaybackHistory** - Historique de lecture
- **Subscription** - Abonnements utilisateur
- **Notification** - Système de notifications

## 🔐 Authentification

### Inscripion (POST `/api/auth/register`)

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

### Connexion

Utiliser NextAuth.js avec le formulaire de connexion `/signin`

### Rôles utilisateur

- **USER** - Utilisateur standard
- **MODERATOR** - Modérateur de contenu
- **ADMIN** - Administrateur de plateforme

## 🎯 Modules

### Radio Module (`/radio`)

- Liste des stations de radio en direct
- Lecteur audio intégré avec contrôle volume
- Affichage des auditeurs en direct
- Favoris et historique d'écoute

**API**: `GET /api/streams/radio`

### TV Module (`/tv`)

- Chaînes de télévision en direct
- Lecteur vidéo haute définition (HLS/DASH)
- Affichage de l'émission actuelle
- Qualité sélectionnable

**API**: `GET /api/streams/tv`

### Press Module (`/press`)

- Fil d'actualités par catégorie
- Articles vedettes et récents
- Filtrage par catégorie (NEWS, SPORTS, CULTURE, TECH)
- Statistiques de lecture (vues, commentaires)

**API**: `GET /api/articles?category=NEWS`

### Admin Dashboard (`/admin`)

- Tableau de bord de supervision
- Statistiques en temps réel
- Gestion des flux actifs
- État des serveurs
- Activité récente

## 🔗 API Endpoints

### Streams

```
GET  /api/streams/radio           # Lister les radios
GET  /api/streams/tv              # Lister les chaînes TV
```

### Articles

```
GET  /api/articles                # Lister les articles
GET  /api/articles?category=NEWS  # Filtrer par catégorie
GET  /api/articles?featured=true  # Articles vedettes
```

### Authentification

```
POST /api/auth/register           # Créer un compte
POST /api/auth/signin             # Se connecter (NextAuth)
POST /api/auth/signout            # Se déconnecter
GET  /api/auth/session            # Récupérer la session
```

## 🎨 Personnalisation

### Design System

- **Couleurs**: Slate/Blue
- **Typography**: Inter (via Geist)
- **Composants UI**: shadcn/ui
- **Breakpoints**: Responsive mobile-first

### Personnaliser le branding

1. Éditer `/components/navigation/navbar.tsx` - Logo et nom
2. Éditer `app/layout.tsx` - Metadata et titre
3. Éditer `app/globals.css` - Couleurs et thème

## 🚀 Déploiement

### Sur Vercel

```bash
vercel deploy
```

### Configuration Vercel

Ajouter les variables d'environnement sur Vercel Dashboard:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

### Base de données

1. **Neon** (recommandé pour Vercel)
   - Créer un projet sur neon.tech
   - Copier la connection string dans `DATABASE_URL`

2. **Supabase**
   - Créer une base PostgreSQL
   - Configurer `DATABASE_URL`

3. **AWS Aurora**
   - Provisionner Aurora PostgreSQL
   - Configurer accès public et firewall

## 📝 Roadmap

- [ ] Intégration Firebase Cloud Messaging pour notifications push
- [ ] Système de favoris et watchlist
- [ ] Historique de visionnage et recommandations
- [ ] Commentaires et interactions sociales
- [ ] EPG (Guide électronique des programmes)
- [ ] Mise en cache CDN pour streams
- [ ] Analytics avancées
- [ ] Application mobile (Capacitor)

## 🐛 Dépannage

### Erreur: "Module not found: @prisma/client"

```bash
pnpm exec prisma generate
```

### Erreur de connexion base de données

```bash
# Vérifier la connection string
echo $DATABASE_URL

# Tester la connexion
pnpm exec prisma db push
```

### NextAuth ne fonctionne pas

- Vérifier que `NEXTAUTH_SECRET` est défini
- Vérifier que `NEXTAUTH_URL` correspond à l'URL du site
- Cleared les cookies du navigateur

## 📚 Documentation utile

- [Next.js 16 Docs](https://nextjs.org/docs)
- [NextAuth.js v4](https://next-auth.js.org/)
- [Prisma ORM](https://www.prisma.io/docs)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 📞 Support

Pour toute question ou problème:
1. Vérifier la documentation
2. Consulter les issues du projet
3. Créer une nouvelle issue avec détails

## 📄 Licence

MIT License - Libre d'utilisation

---

**Nkoh** - Connectant le Cameroun aux contenus numériques de qualité.
