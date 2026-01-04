import { Song } from '@/types'

interface NowPlayingProps {
  song: Song | null
}

export default function NowPlaying({ song }: NowPlayingProps) {
  if (!song) {
    return (
      <div className="bg-surface rounded-lg p-6 text-center">
        <div className="w-64 h-64 mx-auto bg-surface-light rounded-lg flex items-center justify-center mb-4">
          <span className="text-6xl">🎵</span>
        </div>
        <p className="text-text-secondary">No song selected</p>
      </div>
    )
  }

  const coverImage = song.metadata?.cover_image?.imgix_url || 
                     song.metadata?.album?.metadata?.cover_image?.imgix_url

  return (
    <div className="bg-surface rounded-lg p-6">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Now Playing
      </h2>
      
      <div className="relative mb-6">
        {coverImage ? (
          <img
            src={`${coverImage}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={song.title}
            className="w-full aspect-square rounded-lg object-cover shadow-2xl"
          />
        ) : (
          <div className="w-full aspect-square bg-surface-light rounded-lg flex items-center justify-center">
            <span className="text-8xl">🎵</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-text truncate">
          {song.title}
        </h3>
        
        {song.metadata?.artist && (
          <p className="text-lg text-text-secondary truncate">
            {song.metadata.artist.title}
          </p>
        )}
        
        {song.metadata?.album && (
          <p className="text-sm text-text-secondary truncate">
            {song.metadata.album.title}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-text-secondary pt-2">
          {song.metadata?.genre && (
            <span className="px-2 py-1 bg-surface-light rounded">
              {song.metadata.genre}
            </span>
          )}
          {song.metadata?.year && (
            <span>{song.metadata.year}</span>
          )}
        </div>
      </div>
    </div>
  )
}