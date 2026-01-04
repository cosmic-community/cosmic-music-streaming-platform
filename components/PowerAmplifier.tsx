'use client'

interface PowerAmplifierProps {
  preamp: number
  onPreampChange: (value: number) => void
}

export default function PowerAmplifier({ preamp, onPreampChange }: PowerAmplifierProps) {
  return (
    <div className="mt-6 pt-6 border-t border-secondary">
      <h3 className="text-lg font-semibold mb-4">Power Amplifier</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Preamp Gain</span>
          <span className="text-sm font-mono text-primary">
            {preamp > 0 ? '+' : ''}{preamp.toFixed(1)}dB
          </span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="-12"
            max="12"
            step="0.5"
            value={preamp}
            onChange={(e) => onPreampChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>-12dB</span>
            <span>0dB</span>
            <span>+12dB</span>
          </div>
        </div>

        <div className="bg-surface-light rounded p-3 text-xs text-text-secondary">
          <p className="mb-2">
            <strong className="text-text">Power Amp:</strong> Adjusts the overall output level before your speakers or headphones.
          </p>
          <p>
            Use positive values to boost quiet recordings or negative values to prevent clipping with loud EQ settings.
          </p>
        </div>

        {/* VU Meter visualization */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Output Level</span>
            <span>
              {preamp > 0 ? 'Boosted' : preamp < 0 ? 'Reduced' : 'Normal'}
            </span>
          </div>
          <div className="h-2 bg-surface-light rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((preamp + 12) / 24) * 100}%`,
                backgroundColor: preamp > 6 ? '#ef4444' : preamp > 0 ? '#f59e0b' : '#1db954',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}