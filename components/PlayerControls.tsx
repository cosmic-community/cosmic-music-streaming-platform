'use client'

interface PlayerControlsProps {
  isPlaying: boolean
  onTogglePlay: () => void
  onNext: () => void
  onPrevious: () => void
  currentTime: number
  duration: number
  volume: number
  onVolumeChange: (volume: number) => void
  onSeek: (time: number) => void
}

export default function PlayerControls({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrevious,
  currentTime,
  duration,
  volume,
  onVolumeChange,
  onSeek,
}: PlayerControlsProps) {
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-surface rounded-lg p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={onPrevious}
          className="w-10 h-10 rounded-full bg-surface-light hover:bg-secondary transition-colors flex items-center justify-center"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={onTogglePlay}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover transition-colors flex items-center justify-center"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={onNext}
          className="w-10 h-10 rounded-full bg-surface-light hover:bg-secondary transition-colors flex items-center justify-center"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 18h2V6h-2zm-11 0l8.5-6L5 6z" />
          </svg>
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs text-text-secondary w-8 text-right">{volume}</span>
      </div>
    </div>
  )
}