'use client'

import { useEffect, useState } from 'react'
import { AuthModalProvider } from '@/components/auth/auth-modal-provider'

interface Article {
  id: string
  title: string
  excerpt: string
  thumbnail: string
  author: string
  category: string
  publishedAt: string
  views: number
  comments: number
}

export default function PressPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = selectedCategory
          ? `/api/articles?category=${selectedCategory}`
          : '/api/articles'
        const response = await fetch(url)
        const data = await response.json()
        if (data.success && data.data) {
          setArticles(data.data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [selectedCategory])

  const categories = ['NEWS', 'SPORTS', 'CULTURE', 'TECH', 'ENVIRONMENT']

  const formatDate = (date: string) => {
    const now = new Date()
    const published = new Date(date)
    const diff = now.getTime() - published.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'À l\'instant'
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 7) return `Il y a ${days}j`
    return published.toLocaleDateString('fr-FR')
  }

  return (
    <>
      <AuthModalProvider />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Presse</h1>
      <p className="text-slate-400 mb-8">Les dernières actualités du Cameroun et du monde</p>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-white">Chargement...</div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Aucun article trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Article */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
            {articles[0] && (
              <>
                <div className="h-64 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-6xl">
                  {articles[0].thumbnail}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                      {articles[0].category}
                    </span>
                    <span className="text-xs text-slate-500">{formatDate(articles[0].publishedAt)}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{articles[0].title}</h2>
                  <p className="text-slate-300 mb-4">{articles[0].excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Par {articles[0].author}</span>
                    <div className="flex gap-4">
                      <span>👁 {articles[0].views.toLocaleString()}</span>
                      <span>💬 {articles[0].comments}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar Articles */}
          <div className="space-y-4">
            {articles.slice(1).map((article) => (
              <article
                key={article.id}
                className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded flex-shrink-0 flex items-center justify-center text-2xl">
                    {article.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">{article.title}</h3>
                    <p className="text-xs text-slate-500">{formatDate(article.publishedAt)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
      </>
  )
}
