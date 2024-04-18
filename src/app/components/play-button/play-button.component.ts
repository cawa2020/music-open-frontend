import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/audio.service';
import { SongService } from '../../services/song.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent {
  @Input({ required: true }) isPlaying: boolean = false
  @Input() queue!: Track[]

  constructor(private songData: SongService, private audio: PlayerService) { }

  // PLAYBUTTON
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
