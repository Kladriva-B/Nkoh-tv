import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-response'

// Mock articles data
const MOCK_ARTICLES = [
  {
    id: 'article-1',
    title: 'Cameroun: Nouvelle campagne de santé publique lancée',
    excerpt: 'Le gouvernement lance une vaste campagne de sensibilisation sur la santé publique...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '📰',
    author: 'Jean Dupont',
    category: 'NEWS',
    featured: true,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 1250,
    comments: 34,
  },
  {
    id: 'article-2',
    title: 'Football: Coton Sport en tête du classement',
    excerpt: 'Après sa victoire contre Eca Coton, Coton Sport consolide sa position...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '⚽',
    author: 'Marie N\'doumbe',
    category: 'SPORTS',
    featured: false,
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    views: 890,
    comments: 23,
  },
  {
    id: 'article-3',
    title: 'Cinéma camerounais: Trois films sélectionnés pour Cannes',
    excerpt: 'La sélection de trois films camerounais pour le festival de Cannes marque...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '🎬',
    author: 'Paul Mbah',
    category: 'CULTURE',
    featured: true,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    views: 2100,
    comments: 56,
  },
  {
    id: 'article-4',
    title: 'Technologie: Startup camerounaise reçoit un financement de 5M$',
    excerpt: 'Une startup de Douala spécialisée en IA reçoit un important financement...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '💻',
    author: 'Sophie Talla',
    category: 'TECH',
    featured: false,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    views: 1560,
    comments: 42,
  },
  {
    id: 'article-5',
    title: 'Environnement: Reforestation dans la région de l\'Adamaoua',
    excerpt: 'Le programme de reforestation atteint ses objectifs avec 50,000 arbres plantés...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '🌳',
    author: 'Luc Kwete',
    category: 'ENVIRONMENT',
    featured: false,
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    views: 945,
    comments: 28,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    let filtered = MOCK_ARTICLES

    if (category) {
      filtered = filtered.filter(a => a.category === category)
    }

    if (featured === 'true') {
      filtered = filtered.filter(a => a.featured)
    }

    return successResponse(filtered)
  } catch (error) {
    return successResponse([])
  }
}
