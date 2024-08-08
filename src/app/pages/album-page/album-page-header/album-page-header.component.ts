import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../core/services/audio.service';
import { filter } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { UserService } from '../../../core/services/user.service';
import { PlayButtonComponent } from '../../../shared/components/play-button/play-button.component';
import { Album } from '../../../shared/interfaces/album.interface';

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
  public isFavorite: boolean = false;
  public isFavoriteLoading: boolean = false;

  constructor(private audio: AudioService, private songData: SongService, private userService: UserService) { }

  ngOnChanges(): void {
    this.initIsPlaying()
    this.initIsFavorite()
  }

  addToFavorite() {
    this.isFavoriteLoading = true
    this.userService.addToFavotiteAlbum(this.album).subscribe((user) => {
      if (!user) return;
      this.isFavorite = !this.isFavorite;
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

  private initIsFavorite() {
    const userAlbums = this.userService.getUser()?.favoriteAlbums ?? []
    this.isFavorite = userAlbums.some((e) => e.id === this.album.id);
  }
}
