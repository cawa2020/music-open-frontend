import { Component, OnInit, Signal, computed, effect } from '@angular/core';
import { Album } from '../../shared/interfaces/album.interface';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { UserService } from '../../core/services/user.service';
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";
import { PlaylistCardComponent } from "../../shared/components/playlist-card/playlist-card.component";
import { AlbumCardComponent } from "../../shared/components/album-card/album-card.component";
import { Collection } from '../../shared/interfaces/collection.interface';
import { CollectionCardComponent } from "../../shared/components/collection-card/collection-card.component";

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
  imports: [ArtistComponent, PlaylistCardComponent, AlbumCardComponent, CollectionCardComponent]
})
export class LibraryComponent implements OnInit {
  public utilities: Signal<(Album | Playlist | Artist | Collection)[]> = computed(() => {
    const user = this.userService.user()
    if (!user) return []
    const collection: Collection = {
      songs: user.favoriteSongs,
      publish_date: '',
      type: 'collection'
    }
    return [collection, ...user.favoriteAlbums, ...user.favoriteArtists, ...user.favoritePlaylists]
  })

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
}
