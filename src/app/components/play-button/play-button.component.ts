import { Component, Input } from '@angular/core';
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
  @Input() queue!: Track[]
  public isPlaying!: boolean

  constructor(private songData: SongService, private audio: PlayerService) { }

  ngOnInit() {
    this.audio.audioChanges.pipe(filter(el => el.type === 'time')).subscribe(value => this.isPlaying = value.data)
  }

  // PLAYBUTTON
  play() {
    const currQueue = JSON.stringify(this.songData.getQueue())
    const newQueue = JSON.stringify(this.queue)
    if (currQueue === newQueue) {
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
