import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-response'

// Mock radio streams data - will be replaced with database queries
const MOCK_RADIO_STREAMS = [
  {
    id: 'radio-1',
    title: 'NTV Radio',
    description: 'Musique, actualités et divertissement 24/7',
    streamUrl: 'https://example.com/stream/ntv-radio.m3u8',
    logo: '📻',
    category: 'RADIO',
    listeners: 1250,
    isLive: true,
  },
  {
    id: 'radio-2',
    title: 'Radio CRTV',
    description: 'La voix du Cameroun',
    streamUrl: 'https://example.com/stream/crtv-radio.m3u8',
    logo: '📻',
    category: 'RADIO',
    listeners: 3420,
    isLive: true,
  },
  {
    id: 'radio-3',
    title: 'Akaré Radio',
    description: 'Musique camerounaise et variété',
    streamUrl: 'https://example.com/stream/akare-radio.m3u8',
    logo: '🎵',
    category: 'RADIO',
    listeners: 2150,
    isLive: true,
  },
  {
    id: 'radio-4',
    title: 'Vision 4 Radio',
    description: 'Actualités et débats',
    streamUrl: 'https://example.com/stream/vision4-radio.m3u8',
    logo: '📻',
    category: 'RADIO',
    listeners: 1890,
    isLive: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with database query when Neon is connected
    // const streams = await prisma.stream.findMany({
    //   where: {
    //     type: 'LIVE',
    //     channel: { category: 'RADIO' }
    //   }
    // })

    return successResponse(MOCK_RADIO_STREAMS)
  } catch (error) {
    return successResponse([])
  }
}
