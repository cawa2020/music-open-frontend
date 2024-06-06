import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../core/services/audio.service';
import { ApiService } from '../../../core/services/api.service';
import { filter, map, take } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { Album, AlbumBrief } from '../../interfaces/album.interface';
import { Song } from '../../interfaces/song.interface';
import { scaleIn } from '../../animations/scaleIn';
import { scaleOut } from '../../animations/scaleOut';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.css',
  animations: [scaleIn, scaleOut]
})

export class AlbumCardComponent {
  @Input({ required: true }) album!: Album | AlbumBrief
  public showButtons: boolean = false

  constructor(private player: AudioService, private api: ApiService, private songData: SongService) { }

  playAlbum() {
    this.api.getAlbumTracks(this.album.id).pipe(map(res => res.data), take(1)).subscribe(tracks => {
      const queue: Song[] = tracks.map((el) => {
        return { ...el, album: this.album }
      })

      this.songData.setQueue(queue)
      this.player.setSong(queue[0])
      this.player.playSong()
    })
  }

  @HostListener('mouseenter')
  onHover() {
    this.showButtons = true
  }

  @HostListener('mouseleave')
  onLeave() {
    this.showButtons = false
  }
}
