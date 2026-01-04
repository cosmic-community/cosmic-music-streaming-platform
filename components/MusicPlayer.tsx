'use client'

import { useState, useEffect, useRef } from 'react'
import { Song, PlayerState, EQState } from '@/types'
import PlayerControls from '@/components/PlayerControls'
import NowPlaying from '@/components/NowPlaying'
import Equalizer from '@/components/Equalizer'
import PowerAmplifier from '@/components/PowerAmplifier'
import Playlist from '@/components/Playlist'
import AudioVisualizer from '@/components/AudioVisualizer'

interface MusicPlayerProps {
  songs: Song[]
}

export default function MusicPlayer({ songs }: MusicPlayerProps) {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: songs[0] || null,
    isPlaying: false,
    volume: 70,
    currentTime: 0,
    duration: 0,
    playlist: songs,
    currentIndex: 0,
    shuffle: false,
    repeat: 'off',
  })

  const [eqState, setEqState] = useState<EQState>({
    bands: {
      32: 0,
      64: 0,
      125: 0,
      250: 0,
      500: 0,
      1000: 0,
      2000: 0,
      4000: 0,
      8000: 0,
      16000: 0,
    },
    preamp: 0,
    enabled: true,
  })

  const [showEqualizer, setShowEqualizer] = useState(true)
  const [showAmplifier, setShowAmplifier] = useState(true)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const filterNodesRef = useRef<BiquadFilterNode[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new AudioContext()
      
      if (audioRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
        gainNodeRef.current = audioContextRef.current.createGain()
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256

        // Create filter nodes for each EQ band
        const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
        filterNodesRef.current = frequencies.map(freq => {
          const filter = audioContextRef.current!.createBiquadFilter()
          filter.type = 'peaking'
          filter.frequency.value = freq
          filter.Q.value = 1
          filter.gain.value = 0
          return filter
        })

        // Connect audio nodes
        let lastNode: AudioNode = sourceRef.current
        filterNodesRef.current.forEach(filter => {
          lastNode.connect(filter)
          lastNode = filter
        })
        lastNode.connect(gainNodeRef.current)
        gainNodeRef.current.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)
      }
    }

    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close()
      }
    }
  }, [])

  // Update EQ bands
  useEffect(() => {
    if (eqState.enabled && filterNodesRef.current.length > 0) {
      const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
      frequencies.forEach((freq, index) => {
        const filter = filterNodesRef.current[index]
        if (filter) {
          filter.gain.value = eqState.bands[freq as keyof typeof eqState.bands]
        }
      })
    }
  }, [eqState])

  // Update volume and preamp
  useEffect(() => {
    if (gainNodeRef.current) {
      const volumeGain = playerState.volume / 100
      const preampGain = Math.pow(10, eqState.preamp / 20)
      gainNodeRef.current.gain.value = volumeGain * preampGain
    }
  }, [playerState.volume, eqState.preamp])

  const playSong = (song: Song, index: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentSong: song,
      currentIndex: index,
      isPlaying: true,
    }))
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (playerState.isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
    }
  }

  const nextSong = () => {
    let nextIndex = playerState.currentIndex + 1
    if (nextIndex >= songs.length) {
      nextIndex = 0
    }
    playSong(songs[nextIndex] as Song, nextIndex)
  }

  const previousSong = () => {
    let prevIndex = playerState.currentIndex - 1
    if (prevIndex < 0) {
      prevIndex = songs.length - 1
    }
    playSong(songs[prevIndex] as Song, prevIndex)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={playerState.currentSong?.metadata?.audio_file?.url || ''}
        onTimeUpdate={(e) => {
          setPlayerState(prev => ({
            ...prev,
            currentTime: e.currentTarget.currentTime,
          }))
        }}
        onLoadedMetadata={(e) => {
          setPlayerState(prev => ({
            ...prev,
            duration: e.currentTarget.duration,
          }))
        }}
        onEnded={nextSong}
      />

      {/* Left Column - Now Playing & Controls */}
      <div className="lg:col-span-1 space-y-6">
        <NowPlaying song={playerState.currentSong} />
        <PlayerControls
          isPlaying={playerState.isPlaying}
          onTogglePlay={togglePlay}
          onNext={nextSong}
          onPrevious={previousSong}
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          volume={playerState.volume}
          onVolumeChange={(volume) => setPlayerState(prev => ({ ...prev, volume }))}
          onSeek={(time) => {
            if (audioRef.current) {
              audioRef.current.currentTime = time
            }
          }}
        />
        <AudioVisualizer analyser={analyserRef.current} isPlaying={playerState.isPlaying} />
      </div>

      {/* Middle Column - Audio Controls */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Audio Controls</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEqualizer(!showEqualizer)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  showEqualizer ? 'bg-primary text-white' : 'bg-surface-light text-text-secondary'
                }`}
              >
                EQ
              </button>
              <button
                onClick={() => setShowAmplifier(!showAmplifier)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  showAmplifier ? 'bg-primary text-white' : 'bg-surface-light text-text-secondary'
                }`}
              >
                Amp
              </button>
            </div>
          </div>
          
          {showEqualizer && (
            <Equalizer
              eqState={eqState}
              onEqChange={(newState) => setEqState(newState)}
            />
          )}
          
          {showAmplifier && (
            <PowerAmplifier
              preamp={eqState.preamp}
              onPreampChange={(value) => setEqState(prev => ({ ...prev, preamp: value }))}
            />
          )}
        </div>
      </div>

      {/* Right Column - Playlist */}
      <div className="lg:col-span-1">
        <Playlist
          songs={songs}
          currentSong={playerState.currentSong}
          onSongSelect={playSong}
        />
      </div>
    </div>
  )
}