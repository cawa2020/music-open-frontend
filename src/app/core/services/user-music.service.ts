import { Injectable } from '@angular/core';
import { Album, AlbumBrief } from '../../shared/interfaces/album.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { Collection } from '../../shared/interfaces/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class UserMusicService {
  private userAlbums = new BehaviorSubject<(Album | Playlist | Artist | Collection)[]>([])

  constructor() { }

  setMusic(newAlbums: (Album | Playlist | Artist | Collection)[]) {
    this.userAlbums.next(newAlbums)
  }

  getMusic(): BehaviorSubject<(Album | Playlist | Artist | Collection)[]> {
    return this.userAlbums
  }
}
