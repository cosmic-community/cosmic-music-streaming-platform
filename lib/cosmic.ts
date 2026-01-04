import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all songs with related data
export async function getAllSongs() {
  try {
    const response = await cosmic.objects
      .find({ type: 'songs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch songs');
  }
}

// Get a single song by slug
export async function getSongBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'songs', slug })
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch song');
  }
}

// Get all albums
export async function getAllAlbums() {
  try {
    const response = await cosmic.objects
      .find({ type: 'albums' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch albums');
  }
}

// Get all artists
export async function getAllArtists() {
  try {
    const response = await cosmic.objects
      .find({ type: 'artists' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch artists');
  }
}

// Get all playlists
export async function getAllPlaylists() {
  try {
    const response = await cosmic.objects
      .find({ type: 'playlists' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch playlists');
  }
}

// Get EQ presets
export async function getEQPresets() {
  try {
    const response = await cosmic.objects
      .find({ type: 'eq-presets' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch EQ presets');
  }
}