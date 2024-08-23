import { Song } from "./song.interface";

export interface Collection {
  songs: Song[],
  publish_date: string,
  type: 'collection'
}
