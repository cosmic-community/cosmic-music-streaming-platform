# 🎵 Cosmic Music Streaming Platform

![App Preview](https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=300&fit=crop&auto=format)

A premium music streaming platform with advanced audio controls, featuring a professional 10-band equalizer and power amplifier. Built for audiophiles and music enthusiasts who demand precise control over their listening experience.

## ✨ Features

- **Advanced 10-Band Equalizer** - Precision frequency control from 32Hz to 16kHz
- **Professional Power Amplifier** - Volume boost up to +12dB with real-time processing
- **Dynamic Playlist Management** - Browse and organize your music library
- **Audio Visualization** - Real-time frequency spectrum analyzer
- **Preset EQ Modes** - Rock, Pop, Jazz, Classical, Electronic, and custom presets
- **Responsive Audio Controls** - Full playback control with shuffle and repeat
- **Dark Mode Interface** - Premium UI designed for extended listening sessions
- **Real-time Audio Processing** - Web Audio API integration for pristine sound quality
- **Cosmic CMS Integration** - Dynamic content management for music library

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=695a35d96d538c4d2c71826a&clone_repository=695a37e36d538c4d2c71827b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> music app with a power amp and eq

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic SDK** - Content management
- **Web Audio API** - Real-time audio processing
- **React** - UI components and state management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket
- Basic understanding of React and Next.js

### Installation

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

3. **Run the development server:**
   ```bash
   bun run dev
   ```

4. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Songs

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all songs with artist and album info
const { objects: songs } = await cosmic.objects
  .find({ type: 'songs' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single song by slug
const { object: song } = await cosmic.objects
  .findOne({ type: 'songs', slug: 'song-slug' })
  .depth(1)
```

### Managing Playlists

```typescript
// Create a new playlist
await cosmic.objects.insertOne({
  title: 'My Playlist',
  type: 'playlists',
  metadata: {
    description: 'My favorite songs',
    songs: ['song-id-1', 'song-id-2'], // Array of song IDs
    cover_image: 'playlist-cover.jpg'
  }
})

// Update playlist
await cosmic.objects.updateOne('playlist-id', {
  metadata: {
    songs: ['song-id-1', 'song-id-2', 'song-id-3']
  }
})
```

## 🎨 Cosmic CMS Integration

This application integrates with Cosmic CMS to manage your music library. The content model includes:

### Content Types

- **Songs** - Individual tracks with title, artist, album, duration, and audio file
- **Albums** - Collections of songs with artwork and release information
- **Artists** - Musician profiles with bio and discography
- **Playlists** - User-created song collections
- **EQ Presets** - Saved equalizer settings for different music genres

### Key Features

- Dynamic content loading from Cosmic bucket
- Real-time audio processing with Web Audio API
- Persistent EQ and amplifier settings
- Seamless playlist management
- Album artwork optimization via imgix

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Add environment variables in Netlify dashboard
4. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
5. Deploy

### Environment Variables for Production

Set these in your hosting platform's dashboard:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

---

Built with [Cosmic](https://www.cosmicjs.com) - The Headless CMS for Modern Applications

For more information, visit the [Cosmic Documentation](https://www.cosmicjs.com/docs).

<!-- README_END -->