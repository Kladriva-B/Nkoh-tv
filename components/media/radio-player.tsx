'use client'

import { useState, useRef, useEffect } from 'react'

interface RadioPlayerProps {
  title: string
  streamUrl: string
  description?: string
}

export function RadioPlayer({ title, streamUrl, description }: RadioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setError('Impossible de lire le flux audio')
            setIsPlaying(false)
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleError = () => {
    setError('Source audio non disponible')
    setIsPlaying(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <audio
        ref={audioRef}
        src={streamUrl}
        onEnded={() => setIsPlaying(false)}
        onError={handleError}
        crossOrigin="anonymous"
      />

      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-slate-400 text-sm mb-4">{description}</p>}
      
      {error && (
        <div className="mb-4 p-3 bg-amber-900/30 border border-amber-700 rounded text-amber-200 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handlePlayPause}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isPlaying ? '⏸ Pause' : '▶ Écouter'}
        </button>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = parseFloat(e.target.value)
              }
            }}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {isPlaying && (
          <div className="text-center">
            <span className="inline-block text-blue-400 text-sm">◆ EN DIRECT</span>
          </div>
        )}
      </div>
    </div>
  )
}
