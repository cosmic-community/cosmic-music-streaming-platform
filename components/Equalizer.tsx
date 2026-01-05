'use client'

import { EQState } from '@/types'

interface EqualizerProps {
  eqState: EQState
  onEqChange: (newState: EQState) => void
}

const EQ_PRESETS = {
  flat: { 32: 0, 64: 0, 125: 0, 250: 0, 500: 0, 1000: 0, 2000: 0, 4000: 0, 8000: 0, 16000: 0 },
  rock: { 32: 5, 64: 4, 125: -3, 250: -4, 500: -2, 1000: 2, 2000: 4, 4000: 5, 8000: 6, 16000: 6 },
  pop: { 32: -2, 64: -1, 125: 0, 250: 2, 500: 4, 1000: 4, 2000: 2, 4000: 0, 8000: -1, 16000: -2 },
  jazz: { 32: 4, 64: 3, 125: 2, 250: 2, 500: -2, 1000: -2, 2000: 0, 4000: 2, 8000: 3, 16000: 4 },
  classical: { 32: 5, 64: 4, 125: 3, 250: 3, 500: -2, 1000: -2, 2000: 0, 4000: 3, 8000: 4, 16000: 5 },
  electronic: { 32: 6, 64: 5, 125: 2, 250: 0, 500: -2, 1000: 2, 2000: 3, 4000: 4, 8000: 5, 16000: 6 },
}

export default function Equalizer({ eqState, onEqChange }: EqualizerProps) {
  const frequencies = [
    { freq: 32, label: '32Hz' },
    { freq: 64, label: '64Hz' },
    { freq: 125, label: '125Hz' },
    { freq: 250, label: '250Hz' },
    { freq: 500, label: '500Hz' },
    { freq: 1000, label: '1kHz' },
    { freq: 2000, label: '2kHz' },
    { freq: 4000, label: '4kHz' },
    { freq: 8000, label: '8kHz' },
    { freq: 16000, label: '16kHz' },
  ]

  const handleBandChange = (freq: number, value: number) => {
    onEqChange({
      ...eqState,
      bands: {
        ...eqState.bands,
        [freq]: value,
      },
    })
  }

  const applyPreset = (presetName: keyof typeof EQ_PRESETS) => {
    onEqChange({
      ...eqState,
      bands: EQ_PRESETS[presetName] as any,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">10-Band Equalizer</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={eqState.enabled}
            onChange={(e) => onEqChange({ ...eqState, enabled: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-sm">Enable</span>
        </label>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(EQ_PRESETS).map((preset) => (
          <button
            key={preset}
            onClick={() => applyPreset(preset as keyof typeof EQ_PRESETS)}
            className="px-3 py-1 bg-surface-light hover:bg-secondary rounded text-xs transition-colors capitalize"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* EQ Bands */}
      <div className="grid grid-cols-10 gap-2">
        {frequencies.map(({ freq, label }) => (
          <div key={freq} className="flex flex-col items-center">
            <input
              type="range"
              min="-12"
              max="12"
              value={eqState.bands[freq as keyof typeof eqState.bands]}
              onChange={(e) => handleBandChange(freq, Number(e.target.value))}
              className="h-24 w-2"
              style={{
                writingMode: 'bt-lr' as any,
                WebkitAppearance: 'slider-vertical',
                appearance: 'slider-vertical' as any,
              }}
              disabled={!eqState.enabled}
            />
            <span className="text-xs text-text-secondary mt-2 text-center">
              {label}
            </span>
            <span className="text-xs font-mono text-primary">
              {eqState.bands[freq as keyof typeof eqState.bands] > 0 ? '+' : ''}
              {eqState.bands[freq as keyof typeof eqState.bands]}dB
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}