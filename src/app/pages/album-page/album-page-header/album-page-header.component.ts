import { Component, computed, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../core/services/audio.service';
import { filter } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { UserService } from '../../../core/services/user.service';
import { PlayButtonComponent } from '../../../shared/components/play-button/play-button.component';
import { Album } from '../../../shared/interfaces/album.interface';
import { UserApiService } from '../../../core/services/user-api.service';

@Component({
  selector: 'app-album-page-header',
  standalone: true,
  imports: [RouterLink, CommonModule, PlayButtonComponent],
  templateUrl: './album-page-header.component.html',
  styleUrl: './album-page-header.component.css'
})
export class AlbumPageHeaderComponent implements OnChanges {
  @Input() album!: Album
  public isPlaying: boolean = false;
  public isFavoriteLoading: boolean = false;
  public isFavorite = computed(() => {
    const userAlbums = this.userService.user()?.favoriteAlbums ?? []
    return userAlbums.some(album => album.id === this.album.id);
  });

  constructor(
    private audio: AudioService,
    private songData: SongService,
    private userService: UserService,
    private userApiService: UserApiService,
  ) { }

  ngOnChanges(): void {
    this.initIsPlaying()
  }

  addToFavorite() {
    this.isFavoriteLoading = true
    this.userApiService.addToFavotiteAlbum(this.album).subscribe((user) => {
      if (!user) return;
      this.userService.setUser(user)
      this.isFavoriteLoading = false
    });
  }

  playShuffle() {
    this.songData.setQueue(this.album.tracks.data)
    this.songData.setShuffle(true)
    this.audio.setSong(this.songData.getQueue()[0])
    this.audio.playSong()
  }

  private initIsPlaying() {
    this.audio.audioChanges
      .pipe(filter((el) => el.type === 'time'))
      .subscribe((el) => this.isPlaying = el.data && this.songData.compareQueues(this.album.tracks.data));
  }
}
