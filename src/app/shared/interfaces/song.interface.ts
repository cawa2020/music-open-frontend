import { Album, AlbumBrief } from "./album.interface"
import { Artist, ArtistBrief } from "./artist.interface"

export interface Song {
  id: number
  readable: boolean
  title: string
  title_short: string
  title_version: string
  link: string
  duration: number
  rank: number
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  preview: string
  md5_image: string
  artist: ArtistBrief
  album: Album | AlbumBrief
  contributors?: Artist[]
  type: 'track'
}

export interface SongBrief {
  id: number
  readable: boolean
  title: string
  title_short: string
  title_version: string
  isrc: string
  link: string
  duration: number
  track_position: number
  disk_number: number
  rank: number
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  preview: string
  md5_image: string
  artist: ArtistBrief
  type: 'track'
}
