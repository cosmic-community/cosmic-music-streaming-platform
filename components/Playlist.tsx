import { Song } from '@/types'

interface PlaylistProps {
  songs: Song[]
  currentSong: Song | null
  onSongSelect: (song: Song, index: number) => void
}

export default function Playlist({ songs, currentSong, onSongSelect }: PlaylistProps) {
  if (!songs || songs.length === 0) {
    return (
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Playlist</h2>
        <p className="text-text-secondary text-center py-8">No songs available</p>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Playlist</h2>
        <span className="text-sm text-text-secondary">
          {songs.length} {songs.length === 1 ? 'song' : 'songs'}
        </span>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {songs.map((song, index) => {
          const isActive = currentSong?.id === song.id
          const coverImage = song.metadata?.cover_image?.imgix_url || 
                           song.metadata?.album?.metadata?.cover_image?.imgix_url

          return (
            <button
              key={song.id}
              onClick={() => onSongSelect(song, index)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary bg-opacity-20 border border-primary' 
                  : 'hover:bg-surface-light'
              }`}
            >
              <div className="relative flex-shrink-0">
                {coverImage ? (
                  <img
                    src={`${coverImage}?w=100&h=100&fit=crop&auto=format,compress`}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-surface-light flex items-center justify-center">
                    <span className="text-xl">🎵</span>
                  </div>
                )}
                
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                    <svg className="w-6 h-6 text-primary animate-pulse-slow" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 text-left min-w-0">
                <p className={`font-medium truncate ${isActive ? 'text-primary' : 'text-text'}`}>
                  {song.title}
                </p>
                {song.metadata?.artist && (
                  <p className="text-sm text-text-secondary truncate">
                    {song.metadata.artist.title}
                  </p>
                )}
              </div>

              {song.metadata?.duration && (
                <span className="text-xs text-text-secondary flex-shrink-0">
                  {Math.floor(song.metadata.duration / 60)}:{(song.metadata.duration % 60).toString().padStart(2, '0')}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}