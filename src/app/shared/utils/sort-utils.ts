import { AlbumBrief } from "../interfaces/album.interface";

export function sortAlbumByDate(arr: AlbumBrief[]): AlbumBrief[] {
    return arr.sort((a, b) => {
      const date1 = new Date(a.release_date);
      const date2 = new Date(b.release_date);
      if (date1 > date2) return -1;
      else if (date1 < date2) return 1;
      else return 0;
    });
  }