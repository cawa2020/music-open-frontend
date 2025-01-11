import { Song } from "./song.interface"

export interface CreatePlaylist {
  title: string
  songs: Song[]
}

export interface Playlist extends CreatePlaylist {
  id: number
  creationDate: string
  userId: string
  userName: string
  type: 'playlist'
  md5_image?: string
}

export interface ExtendedPlaylist extends Playlist {
  songs_amount_name: string
  duration: number
}
