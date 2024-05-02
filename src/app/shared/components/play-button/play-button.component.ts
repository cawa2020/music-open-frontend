import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../interfaces/track.interface';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayButtonComponent {
  @Input({ required: true }) isPlaying: boolean = false
  @Input() queue: Song[] = []

  constructor(private songData: SongService, private audio: PlayerService) { }

  play() {
    if (this.songData.compareQueues(this.queue)) {
      if (this.isPlaying) {
        this.audio.pauseSong()
      } else {
        this.audio.playSong()
      }
    } else {
      this.songData.setQueue(this.queue)
      this.audio.setSong(this.queue[0])
      this.audio.playSong()
    }
  }
}
