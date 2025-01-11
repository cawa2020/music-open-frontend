import { Song } from "../interfaces/song.interface"

export function getSongsAmountName(songs: Song[]) {
    return "song" + (songs.length === 1 ? "" : "s")
}

export function getDuration(songs: Song[]) {
    return songs.reduce((total: number, song: Song) => total + song.duration, 0);
}