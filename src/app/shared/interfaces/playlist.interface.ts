import { Song } from "./song.interface"

export interface CreatePlaylist {
  title: string
  songs: Song[]
}

export interface Playlist extends CreatePlaylist {
  id: number
  creation_date: string
  md5_image: string
  userId: string
  type: 'playlist'
}
