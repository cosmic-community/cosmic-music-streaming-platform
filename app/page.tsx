import { getAllSongs } from '@/lib/cosmic'
import { Song } from '@/types'
import MusicPlayer from '@/components/MusicPlayer'

export default async function HomePage() {
  const songs = await getAllSongs() as Song[]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            🎵 Cosmic Music Streaming
          </h1>
          <p className="text-text-secondary">
            Premium audio experience with advanced controls
          </p>
        </header>
        
        <MusicPlayer songs={songs} />
      </div>
    </main>
  )
}