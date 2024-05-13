import { Song } from "./song.interface"

export interface Collection {
  id: string
  title: string
  songs: Song[]
  type: string
}
