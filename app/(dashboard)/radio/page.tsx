'use client'

import { useEffect, useState } from 'react'
import { Metadata } from 'next'
import { RadioPlayer } from '@/components/media/radio-player'

interface RadioStream {
  id: string
  title: string
  description: string
  streamUrl: string
  logo: string
  listeners: number
  isLive: boolean
}

export default function RadioPage() {
  const [streams, setStreams] = useState<RadioStream[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStream, setSelectedStream] = useState<RadioStream | null>(null)

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/streams/radio')
        const data = await response.json()
        if (data.success && data.data) {
          setStreams(data.data)
          setSelectedStream(data.data[0])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des radios:', error)
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
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-2">Radios</h1>
      <p className="text-slate-400 mb-8">Écoutez les stations radio camerounaises en direct</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player */}
        <div className="lg:col-span-2">
          {selectedStream && (
            <RadioPlayer
              title={selectedStream.title}
              streamUrl={selectedStream.streamUrl}
              description={selectedStream.description}
            />
          )}
        </div>

        {/* Station List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white mb-4">Stations</h3>
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
                <span className="text-2xl">{stream.logo}</span>
                {stream.isLive && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">EN DIRECT</span>
                )}
              </div>
              <h4 className="font-medium text-white text-sm">{stream.title}</h4>
              <p className="text-xs text-slate-400 truncate">{stream.description}</p>
              <p className="text-xs text-slate-500 mt-2">👥 {stream.listeners.toLocaleString()} auditeurs</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
