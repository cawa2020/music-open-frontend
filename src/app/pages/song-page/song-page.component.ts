import { Component } from '@angular/core';
import { AlbumCardComponent } from '../../shared/components/album-card/album-card.component';
import { PlaylistCardComponent } from '../../shared/components/playlist-card/playlist-card.component';
import { Song } from '../../shared/interfaces/song.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from '@angular/common';
import { PlayButtonComponent } from "../../shared/components/play-button/play-button.component";
import { AudioService } from '../../core/services/audio.service';
import { filter } from 'rxjs';
import { SongService } from '../../core/services/song.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-song-page',
  standalone: true,
  templateUrl: './song-page.component.html',
  styleUrl: './song-page.component.css',
  imports: [AlbumCardComponent, PlaylistCardComponent, LoaderComponent, RouterLink, CommonModule, PlayButtonComponent]
})
export class MainComponent {
  public song: Song | null = null
  public isPlaying = false
  public isFavorite = false
  public isFavoriteLoading = false

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private audio: AudioService,
    private songData: SongService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.initSong()
    this.initIsPlaying()
    this.initIsFavorite()
  }

  addToFavorite() {
    this.isFavoriteLoading = true
    this.userService.addToFavotiteSong(this.song!).subscribe((user) => {
      if (!user) return;
      this.isFavorite = !this.isFavorite;
      this.userService.setUser(user)
      this.isFavoriteLoading = false
    });
  }

  private initSong() {
    this.route.params.subscribe((params) => {
      this.song = null
      const id = Number(params['id']);
      this.api.getSong(id).subscribe((res) => this.song = res);
    });
  }

  private initIsPlaying() {
    const queue = this.song ? [this.song] : []
    this.audio.audioChanges
      .pipe(filter((el) => el.type === 'time'))
      .subscribe((el) => this.isPlaying = el.data && this.songData.compareQueues(queue));
  }

  private initIsFavorite() {
    const userAlbums = this.userService.getUser()?.favoriteSongs ?? []
    this.isFavorite = userAlbums.some((e) => e.id === this.song?.id);
  }
}
