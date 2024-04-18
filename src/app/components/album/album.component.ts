import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Album, AlbumBrief, Track } from '../../interfaces/app.interface';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/audio.service';
import { ApiService } from '../../services/api.service';
import { filter, map, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})

export class AlbumComponent {
  @Input() album!: Album | AlbumBrief

  constructor(private player: PlayerService, private api: ApiService, private songData: SongService) { }

  // PLAYBUTTON
  playAlbum() {
    this.api.getAlbumTracks(this.album.id).pipe(map(res => res.data), take(1)).subscribe(tracks => {
      const queue: Track[] = tracks.map((el) => {
        return { ...el, album: this.album }
      })

      this.songData.setQueue(queue)
      this.player.setSong(queue[0])
      this.player.playSong()
    })
  }
}
