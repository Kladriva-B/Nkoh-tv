import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-response'

// Mock TV streams data
const MOCK_TV_STREAMS = [
  {
    id: 'tv-1',
    title: 'NTV',
    description: 'Chaîne de télévision généraliste camerounaise',
    streamUrl: 'https://example.com/stream/ntv-tv.m3u8',
    thumbnail: '📺',
    category: 'TV',
    viewers: 4250,
    isLive: true,
    currentShow: 'Journal de 20h',
  },
  {
    id: 'tv-2',
    title: 'CRTV',
    description: 'Chaîne nationale du Cameroun',
    streamUrl: 'https://example.com/stream/crtv-tv.m3u8',
    thumbnail: '📺',
    category: 'TV',
    viewers: 5120,
    isLive: true,
    currentShow: 'Magazine du jour',
  },
  {
    id: 'tv-3',
    title: 'Vision 4 Tv',
    description: 'Actualités et divertissement',
    streamUrl: 'https://example.com/stream/vision4-tv.m3u8',
    thumbnail: '🎬',
    category: 'TV',
    viewers: 3650,
    isLive: true,
    currentShow: 'Film du soir',
  },
  {
    id: 'tv-4',
    title: 'Equinoxe Tv',
    description: 'Chaîne premium camerounaise',
    streamUrl: 'https://example.com/stream/equinoxe-tv.m3u8',
    thumbnail: '📺',
    category: 'TV',
    viewers: 2890,
    isLive: true,
    currentShow: 'Série télévisée',
  },
]

export async function GET(request: NextRequest) {
  try {
    return successResponse(MOCK_TV_STREAMS)
  } catch (error) {
    return successResponse([])
  }
}
