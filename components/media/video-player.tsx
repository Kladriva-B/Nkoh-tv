'use client'

import { useState, useRef, useEffect } from 'react'

interface VideoPlayerProps {
  title: string
  streamUrl: string
  description?: string
  currentShow?: string
}

export function VideoPlayer({ title, streamUrl, description, currentShow }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setError('Impossible de lire le flux vidéo')
            setIsPlaying(false)
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleError = () => {
    setError('Source vidéo non disponible')
    setIsPlaying(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.()
      } else {
        document.exitFullscreen?.()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      {/* Video Element */}
      <div className="relative bg-black w-full" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          src={streamUrl}
          className="w-full h-full"
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
          crossOrigin="anonymous"
        />
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded">
            <div className="text-center">
              <p className="text-amber-200 text-sm mb-2">Erreur de lecture</p>
              <p className="text-slate-400 text-xs">{error}</p>
            </div>
          </div>
        )}

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              {currentShow && <p className="text-blue-400 text-sm">En direct: {currentShow}</p>}
            </div>
            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">EN DIRECT</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <div className="flex-1 space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = parseFloat(e.target.value)
                  }
                }}
                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-300">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white text-sm">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <button
              onClick={handleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
              title="Fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          {description && <p className="text-slate-400 text-sm mb-2">{description}</p>}
          {currentShow && <p className="text-blue-400 text-sm">Émission: {currentShow}</p>}
        </div>
      </div>
    </div>
  )
}
