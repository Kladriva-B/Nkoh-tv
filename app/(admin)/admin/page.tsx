'use client'

import { useEffect, useState } from 'react'

interface StreamStats {
  totalViewers: number
  activeStreams: number
  totalChannels: number
}

interface UserStats {
  totalUsers: number
  activeUsers: number
  newToday: number
}

export default function AdminDashboard() {
  const [streamStats, setStreamStats] = useState<StreamStats>({
    totalViewers: 0,
    activeStreams: 0,
    totalChannels: 0,
  })
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newToday: 0,
  })

  useEffect(() => {
    // Mock stats - will be replaced with real API calls
    setStreamStats({
      totalViewers: 12450,
      activeStreams: 8,
      totalChannels: 12,
    })
    setUserStats({
      totalUsers: 5420,
      activeUsers: 1856,
      newToday: 124,
    })
  }, [])

  const recentActivity = [
    { id: 1, type: 'STREAM_STARTED', title: 'NTV Radio - En direct', time: 'Il y a 5 min' },
    { id: 2, type: 'USER_JOINED', title: 'Nouvel utilisateur inscrit', time: 'Il y a 12 min' },
    { id: 3, type: 'STREAM_ENDED', title: 'CRTV TV - Fin de diffusion', time: 'Il y a 28 min' },
    { id: 4, type: 'ERROR_LOG', title: 'Erreur de connexion détectée', time: 'Il y a 45 min' },
  ]

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord Admin</h1>
        <p className="text-slate-400">Supervision et gestion de la plateforme Nkoh</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Viewers Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Spectateurs en direct</h3>
            <span className="text-2xl">👁</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {streamStats.totalViewers.toLocaleString()}
          </div>
          <p className="text-sm text-green-400">+12% par rapport à hier</p>
        </div>

        {/* Active Streams */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Flux actifs</h3>
            <span className="text-2xl">📡</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {streamStats.activeStreams}
          </div>
          <p className="text-sm text-slate-400">sur {streamStats.totalChannels} chaînes</p>
        </div>

        {/* Active Users */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Utilisateurs actifs</h3>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {userStats.activeUsers.toLocaleString()}
          </div>
          <p className="text-sm text-slate-400">{userStats.newToday} nouveaux aujourd&apos;hui</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Streams */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Flux actuellement actifs</h2>
            <div className="space-y-3">
              {[
                { name: 'NTV Radio', viewers: 1250, quality: '320kbps' },
                { name: 'CRTV TV', viewers: 3420, quality: '1080p' },
                { name: 'Vision 4', viewers: 2150, quality: '720p' },
                { name: 'Equinoxe Tv', viewers: 1890, quality: '480p' },
              ].map((stream, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-white">{stream.name}</h4>
                    <p className="text-xs text-slate-400">{stream.quality}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-400">{stream.viewers.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">spectateurs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">État des serveurs</h2>
            <div className="space-y-3">
              {[
                { name: 'Serveur API', status: 'online', uptime: '99.8%' },
                { name: 'Streaming Principal', status: 'online', uptime: '99.9%' },
                { name: 'Base de données', status: 'online', uptime: '99.7%' },
                { name: 'Cache Redis', status: 'online', uptime: '100%' },
              ].map((server, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        server.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-white text-sm">{server.name}</span>
                  </div>
                  <span className="text-xs text-slate-400">{server.uptime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Activité récente</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex gap-2 mb-1">
                  {activity.type === 'STREAM_STARTED' && <span>▶</span>}
                  {activity.type === 'STREAM_ENDED' && <span>■</span>}
                  {activity.type === 'USER_JOINED' && <span>+</span>}
                  {activity.type === 'ERROR_LOG' && <span>!</span>}
                </div>
                <p className="text-sm text-white font-medium">{activity.title}</p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Spectateurs par heure</h2>
          <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400">
            [Graphique - Spectateurs par heure]
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Distribution par chaîne</h2>
          <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400">
            [Graphique - Distribution des spectateurs]
          </div>
        </div>
      </div>
    </div>
  )
}
