import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Album, Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/player.service';
import { FormatterService } from '../../services/formatter.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnChanges{
  @Input() song!: Track
  @Input() queue!: Track[]
  @Input() hideImg?: boolean
  @Input() hideAlbum?: boolean
  @Input() hideArtist?: boolean
  public index!: number

  constructor(private player: PlayerService, private formatter: FormatterService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.index = this.queue.findIndex(el => el.id === this.song.id)
  }

  isSongPause(): boolean {
    return this.player.getAudio().paused
  }

  setTrack(index: number) {
    const currQueue = JSON.stringify(this.player.getQueue())
    const newQueue = JSON.stringify(this.queue)
    if (currQueue !== newQueue) {
      this.player.setQueue(this.queue)
    }
    const song = this.queue[index]
    if (song.id === this.player.getCurrentSong()?.id) {
      if (this.player.getAudio().paused) {
        this.player.continueSong()
      } else {
        this.player.pauseSong()
      }
    } else {
      this.player.setCurrentSong(song)
      this.player.continueSong()
    }
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }

  isCurrentSong(): boolean {
    return this.player?.getCurrentSong()?.id === this.song.id
  }
}
