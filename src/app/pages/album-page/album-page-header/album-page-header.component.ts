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
import { FavoriteButtonComponent } from "../../../shared/components/favorite-button/favorite-button.component";

@Component({
  selector: 'app-album-page-header',
  standalone: true,
  imports: [RouterLink, CommonModule, PlayButtonComponent, FavoriteButtonComponent],
  templateUrl: './album-page-header.component.html',
  styleUrl: './album-page-header.component.css'
})
export class AlbumPageHeaderComponent {
  @Input() album!: Album

  constructor(
    private audio: AudioService,
    private songData: SongService,
  ) { }

  playShuffle() {
    this.songData.setQueue(this.album.tracks.data)
    this.songData.setShuffle(true)
    this.audio.setSong(this.songData.getQueue()[0])
    this.audio.playSong()
  }
}
