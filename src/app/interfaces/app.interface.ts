export type Mode = 'dark' | 'light'
export type Repeat = 'none' | 'song' | 'playlist'

export interface Song {
  author: string
  name: string
  duration: number
  cover: string
  songSource: string
  feat?: string
  id: string
}

export interface Theme {
  mode: Mode;
  color: string;
}

export interface ColorCSS {
  "--main-color": string,
  "--hover-color": string,
  "--focus-color": string
}

export interface ModeCSS {
  "--bg-color-main": string,
  "--bg-color-secondary": string,
  "--text-input-color": string,
  "--text-color": string,
  "--text-color-secondary": string,
  "--icon-color": string,
  "--border-color": string,
  "--bg-slider-color": string,
  "--bg-input-color": string,
  "--silder-color": string
}

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
  type: string
  tracks: { data: Track[] }
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
  genre_id: number
  fans: number
  release_date: string
  record_type: string
  tracklist: string
  explicit_lyrics: boolean
  type: string
}


export interface Genres {
  id: number
  name: string
  picture: string
  type: string
}

export interface Contributor {
  id: number
  name: string
  link: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  radio: boolean
  tracklist: string
  type: string
  role: string
}

export interface Artist {
  nb_fan: number
  nb_album: number
  id: number
  name: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  tracklist: string
  type: string
}

export interface Track {
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
  album: Album
  type: string
  contributors?: Artist[]
}

export interface TrackBrief {
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
  type: string
}


export interface ArtistBrief {
  id: number
  name: string
  tracklist: string
  type: string
}

export interface Playlist {
  id: number
  title: string
  public: boolean
  link: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  checksum: string
  tracklist: string
  creation_date: string
  md5_image: string
  picture_type: string
  user: User
  type: string
}

export interface User {
  id: number
  name: string
  tracklist: string
  type: string
}
