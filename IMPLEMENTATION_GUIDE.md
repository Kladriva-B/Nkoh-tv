# Guide d'implémentation - Nkoh

Ce guide détaille comment compléter et étendre la plateforme Nkoh.

## Étape 1: Configuration de la base de données (Neon)

### 1.1 Créer un compte Neon

1. Aller sur [neon.tech](https://neon.tech)
2. Créer un compte gratuit
3. Créer un nouveau projet PostgreSQL

### 1.2 Obtenir la connection string

```
postgresql://[user]:[password]@[host]/[dbname]
```

### 1.3 Ajouter à `.env.local`

```env
DATABASE_URL="postgresql://user:pass@host/nkoh"
```

### 1.4 Pusher le schéma à la base de données

```bash
pnpm exec prisma db push
```

## Étape 2: Configuration NextAuth

### 2.1 Générer un secret NextAuth

```bash
openssl rand -base64 32
```

### 2.2 Ajouter à `.env.local`

```env
NEXTAUTH_SECRET="votre-secret-generé"
NEXTAUTH_URL="http://localhost:3000"
```

### 2.3 Tester l'authentification

1. Naviguer vers `http://localhost:3000/signup`
2. Créer un compte utilisateur
3. Se connecter avec les identifiants

## Étape 3: Intégrer les vraies données de streaming

### 3.1 Ajouter des chaînes à la base de données

```bash
pnpm exec prisma studio
```

Utiliser Prisma Studio pour:
1. Créer des `Channel` pour chaque radio/TV
2. Créer des `Show` pour chaque émission
3. Créer des `Stream` avec les URLs réelles (HLS)

### 3.2 Remplacer les mock data

Dans `app/api/streams/radio/route.ts`:

```typescript
// Remplacer:
export async function GET(request: NextRequest) {
  // Par:
  const streams = await prisma.stream.findMany({
    where: {
      channel: { category: 'RADIO' },
      status: 'ONLINE'
    },
    include: { channel: true }
  })
  return successResponse(streams)
}
```

Appliquer la même logique à:
- `app/api/streams/tv/route.ts`
- `app/api/articles/route.ts`

## Étape 4: Configuration du streaming HLS/DASH

### 4.1 Format des URLs de streaming

Les URLs doivent supporter le format HLS (`.m3u8`):

```
https://votre-cdn.com/radio/ntv.m3u8
https://votre-cdn.com/tv/crtv.m3u8
```

### 4.2 Providers recommandés

- **AWS CloudFront** - Distribution CDN
- **Bunny.net** - CDN spécialisé streaming
- **Cloudflare Stream** - Streaming managé
- **OVH** - CDN européen

### 4.3 Configurer les headers CORS

Les URLs doivent supporter l'accès CORS depuis le navigateur.

## Étape 5: Ajouter des notifications (Firebase)

### 5.1 Créer un projet Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Créer un nouveau projet
3. Ajouter une application web
4. Récupérer les credentials

### 5.2 Installer Firebase

```bash
pnpm add firebase firebase-admin
```

### 5.3 Ajouter à `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
```

### 5.4 Implémenter les notifications

```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)
```

## Étape 6: Système de favoris

### 6.1 Implémenter l'API des favoris

```typescript
// app/api/favorites/route.ts
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return unauthorizedResponse()

  const { streamId, episodeId } = await request.json()
  
  const favorite = await prisma.favorite.create({
    data: {
      userId: session.user.id,
      streamId,
      episodeId,
    },
  })

  return createdResponse(favorite)
}
```

### 6.2 Ajouter bouton Favoris aux composants

```typescript
// Dans radio-player.tsx
const [isFavorite, setIsFavorite] = useState(false)

const toggleFavorite = async () => {
  await fetch('/api/favorites', {
    method: 'POST',
    body: JSON.stringify({ streamId }),
  })
  setIsFavorite(!isFavorite)
}
```

## Étape 7: EPG (Electronic Program Guide)

### 7.1 Créer la table EPG

```prisma
model ProgramSchedule {
  id        String   @id @default(cuid())
  showId    String
  show      Show     @relation(fields: [showId], references: [id])
  channelId String
  channel   Channel  @relation(fields: [channelId], references: [id])
  startTime DateTime
  endTime   DateTime
  
  @@index([channelId])
}
```

### 7.2 Afficher l'EPG

```typescript
// components/schedule/epg.tsx
export function EPG({ channelId }: { channelId: string }) {
  const [schedule, setSchedule] = useState([])
  
  // Charger les 24h prochaines heures
}
```

## Étape 8: Déploiement

### 8.1 Sur Vercel

```bash
vercel deploy
```

### 8.2 Configurer les variables d'environnement

Dans Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL = postgresql://...
NEXTAUTH_URL = https://votre-domaine.com
NEXTAUTH_SECRET = votre-secret
```

### 8.3 Domain Custom

1. Vérifier les DNS
2. Ajouter le CNAME chez votre registrar
3. Attendre la propagation DNS

## Étape 9: Performance et optimisation

### 9.1 Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/thumbnail.jpg"
  alt="Thumbnail"
  width={300}
  height={200}
  priority
/>
```

### 9.2 Caching des streams

```typescript
export const revalidate = 3600 // Revalider toutes les heures
```

### 9.3 Compression vidéo

Utiliser Cloudinary ou ImageKit pour la transformation d'images.

## Étape 10: Analytics et monitoring

### 10.1 Ajouter Vercel Analytics

```typescript
import { Analytics } from '@vercel/analytics/next'

// Déjà inclus dans layout.tsx
```

### 10.2 Suivi personnalisé

```typescript
import { trackEvent } from '@vercel/analytics/react'

trackEvent('stream_played', {
  channelName: 'NTV Radio',
  duration: 3600
})
```

## Checklist de production

- [ ] Base de données configurée et testée
- [ ] Authentication fonctionnelle
- [ ] Vraies URLs de streaming intégrées
- [ ] Notifications configurées
- [ ] CORS configuré
- [ ] SSL/TLS activé
- [ ] Backups automatiques
- [ ] Monitoring en place
- [ ] Rate limiting configuré
- [ ] Tests d'intégration passés

## Ressources utiles

- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction)
- [HLS.js Documentation](https://github.com/video-dev/hls.js)
- [Vercel Deployment](https://vercel.com/docs)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)

## Support et questions

Consulter `NKOH_SETUP.md` pour plus de détails sur chaque module.
