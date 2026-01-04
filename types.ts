// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Song interface
export interface Song extends CosmicObject {
  type: 'songs';
  metadata: {
    artist?: Artist;
    album?: Album;
    duration?: number;
    audio_file?: {
      url: string;
      imgix_url: string;
    };
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    genre?: string;
    year?: number;
    track_number?: number;
  };
}

// Album interface
export interface Album extends CosmicObject {
  type: 'albums';
  metadata: {
    artist?: Artist;
    release_year?: number;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    genre?: string;
    total_tracks?: number;
  };
}

// Artist interface
export interface Artist extends CosmicObject {
  type: 'artists';
  metadata: {
    bio?: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    genres?: string[];
    website?: string;
  };
}

// Playlist interface
export interface Playlist extends CosmicObject {
  type: 'playlists';
  metadata: {
    description?: string;
    songs?: Song[];
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    is_public?: boolean;
  };
}

// EQ Preset interface
export interface EQPreset extends CosmicObject {
  type: 'eq-presets';
  metadata: {
    frequency_32?: number;
    frequency_64?: number;
    frequency_125?: number;
    frequency_250?: number;
    frequency_500?: number;
    frequency_1k?: number;
    frequency_2k?: number;
    frequency_4k?: number;
    frequency_8k?: number;
    frequency_16k?: number;
    preset_type?: 'rock' | 'pop' | 'jazz' | 'classical' | 'electronic' | 'custom';
  };
}

// Audio player state
export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: Song[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
}

// EQ state
export interface EQState {
  bands: {
    32: number;
    64: number;
    125: number;
    250: number;
    500: number;
    1000: number;
    2000: number;
    4000: number;
    8000: number;
    16000: number;
  };
  preamp: number;
  enabled: boolean;
}

// Type guard for Song
export function isSong(obj: CosmicObject): obj is Song {
  return obj.type === 'songs';
}

// Type guard for Album
export function isAlbum(obj: CosmicObject): obj is Album {
  return obj.type === 'albums';
}

// Type guard for Artist
export function isArtist(obj: CosmicObject): obj is Artist {
  return obj.type === 'artists';
}