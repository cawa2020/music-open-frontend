import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../core/services/audio.service';
import { ApiService } from '../../../core/services/api.service';
import { filter, map, take } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { Album, AlbumBrief } from '../../interfaces/album.interface';
import { Song } from '../../interfaces/track.interface';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AlbumComponent {
  @Input({ required: true }) album!: Album | AlbumBrief

  constructor(private player: PlayerService, private api: ApiService, private songData: SongService) { }

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
}
