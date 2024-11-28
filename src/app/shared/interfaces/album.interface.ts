import { Artist, Contributor } from "./artist.interface"
import { Song } from "./song.interface"

export interface Album {
  id: number
  title: string
  link?: string
  share?: string
  cover?: string
  cover_small?: string
  cover_medium?: string
  cover_big: string
  cover_xl: string
  md5_image?: string
  genre_id?: number
  genres?: { data: Genres[] }
  nb_tracks: number
  duration: number
  fans: number
  release_date: string
  record_type: string
  available: boolean
  tracklist: string
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  contributors: Contributor[]
  artist: Artist
  type: 'album'
  tracks: { data: Song[] }
}

export interface AlbumBrief {
  id: number
  title: string
  link: string
  cover: string
  cover_small: string
  cover_medium: string
  cover_big: string
  cover_xl: string
  md5_image: string
  nb_tracks: number
  genre_id: number
  fans: number
  release_date: string
  record_type: string
  tracklist: string
  explicit_lyrics: boolean
  type: 'album'
}

export interface Genres {
  id: number
  name: string
  picture: string
  picture_big: string
  picture_medium: string
  type: string
}
