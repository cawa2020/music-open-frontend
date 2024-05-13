import { Album } from "./album.interface"
import { Artist } from "./artist.interface"
import { Song } from "./song.interface"

export interface Playlist {
  id: number
  title: string
  songs: Song[]
  creation_date: string
  md5_image: string
  userId: string
  type: string
}
