import { Album } from "./album.interface"
import { Artist } from "./artist.interface"
import { Song } from "./track.interface"

export interface Playlist {
  id: number
  title: string
  songs: Song[]
  creation_date: string
  md5_image: string
  userId: string
  type: string
}

export interface User {
  id: number
  email: string
  username: string
  favoriteSongs: Song[]
  favoriteArtists: Artist[]
  favoritePlaylists: Playlist[]
  favoriteAlbums: Album[]
  created_playlists: Playlist[]
  playlists: Playlist[]
}
