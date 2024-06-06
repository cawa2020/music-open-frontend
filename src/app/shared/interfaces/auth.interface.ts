import { Album } from "./album.interface"
import { Artist } from "./artist.interface"
import { Playlist } from "./playlist.interface"
import { Song } from "./song.interface"

export interface Login {
  username: string
  password: string
}

export interface Registration extends Login {
  email: string
}

export interface Error {
  statusCode: number
}

export interface Token {
  access_token: string
}

export interface User {
  id: number
  email: string
  username: string
  favoriteSongs: Song[]
  favoriteArtists: Artist[]
  favoritePlaylists: Playlist[]
  favoriteAlbums: Album[]
  createdPlaylists: Playlist[]
  recently_played: (Playlist | Album)[]
  playlists: Playlist[]
}
