'use client'

import { useEffect, useState } from 'react'
import { VideoPlayer } from '@/components/media/video-player'
import { AuthModalProvider } from '@/components/auth/auth-modal-provider'

interface TVStream {
  id: string
  title: string
  description: string
  streamUrl: string
  thumbnail: string
  viewers: number
  isLive: boolean
  currentShow: string
}

export default function TVPage() {
  const [streams, setStreams] = useState<TVStream[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStream, setSelectedStream] = useState<TVStream | null>(null)

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/streams/tv')
        const data = await response.json()
        if (data.success && data.data) {
          setStreams(data.data)
          setSelectedStream(data.data[0])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des chaînes TV:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStreams()
  }, [])

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <AuthModalProvider />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Télévision</h1>
        <p className="text-slate-400 mb-8">Regardez les chaînes de télévision camerounaises en direct</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Player */}
        <div className="lg:col-span-3">
          {selectedStream && (
            <VideoPlayer
              title={selectedStream.title}
              streamUrl={selectedStream.streamUrl}
              description={selectedStream.description}
              currentShow={selectedStream.currentShow}
            />
          )}
        </div>

        {/* Channel List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white mb-4">Chaînes</h3>
          {streams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => setSelectedStream(stream)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedStream?.id === stream.id
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stream.thumbnail}</span>
                {stream.isLive && (
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">EN DIRECT</span>
                )}
              </div>
              <h4 className="font-medium text-white text-sm">{stream.title}</h4>
              <p className="text-xs text-slate-400 truncate">{stream.currentShow}</p>
              <p className="text-xs text-slate-500 mt-2">👥 {stream.viewers.toLocaleString()} spectateurs</p>
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
