import { ChangeDetectionStrategy, Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { Playlist } from '../../interfaces/playlist.interface';
import { Album } from '../../interfaces/album.interface';
import { Song } from '../../interfaces/song.interface';
import { SongComponent } from "../song/song.component";
import { FullCoverComponent } from '../full-cover/full-cover.component';
import { ModalService } from '../../../core/services/modal.service';
import { PlayButtonComponent } from "../play-button/play-button.component";
import { FavoriteButtonComponent } from "../favorite-button/favorite-button.component";
import { SongService } from '../../../core/services/song.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-songs-compilation-template',
  standalone: true,
  imports: [SongComponent, PlayButtonComponent, FavoriteButtonComponent],
  templateUrl: './songs-compilation-template.component.html',
  styleUrl: './songs-compilation-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsCompilationTemplateComponent {
  private modalService = inject(ModalService)
  private songData = inject(SongService)
  private audio = inject(AudioService)

  @Input({ required: true }) data!: Playlist | Album

  get queue(): Song[] {
    if (this.data.type == 'album') {
      return this.data.tracks.data
    } else if (this.data.type == 'playlist') {
      return this.data.songs
    } else {
      return []
    }
  }

  get cover(): string {
    const placeholder = '../../assets/imgs/placeholder.jpg'
    if (this.data.type == 'album') {
      return this.data.cover_xl
    } else if (this.data.type == 'playlist') {
      return this.data.md5_image ?? placeholder
    } else {
      return placeholder
    }
  }

  playShuffle() {
    this.songData.setQueue(this.queue)
    this.songData.setShuffle(true)
    this.audio.setSong(this.queue[0])
    this.audio.playSong()
  }

  openFullCover() {
    this.modalService.openModal(FullCoverComponent, { img: this.cover })
  }
}
