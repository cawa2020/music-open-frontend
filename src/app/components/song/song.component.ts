import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Album, Track } from '../../interfaces/app.interface';
import { PlayerService } from '../../services/audio.service';
import { FormatterService } from '../../services/formatter.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SongService } from '../../services/song.service';
import { Observable, filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {
  @Input() song!: Track
  @Input() queue!: Track[]
  @Input() index!: number
  @Input() hideImg?: boolean
  @Input() hideAlbum?: boolean
  @Input() hideArtist?: boolean
  @Input() hideIndex?: boolean
  public isPlaying$!: Observable<boolean>

  constructor(private player: PlayerService, private songData: SongService, private formatter: FormatterService) { }

  ngOnInit(): void {
    this.isPlaying$ = this.player.audioChanges.asObservable().pipe(filter(el => el.type === 'time'), map(el => el.data ))
  }

  isCurrentSong() {
    return this.song.id === this.songData.getSong()?.id
  }

  setTrack() {
    const currQueue = JSON.stringify(this.songData.getQueue())
    const newQueue = JSON.stringify(this.queue)
    if (currQueue !== newQueue) {
      this.songData.setQueue(this.queue)
    }
    const song = this.queue[this.index]
    if (song.id === this.songData.getSong()?.id) {
      if (this.player.getAudio().paused) {
        this.player.continueSong()
      } else {
        this.player.pauseSong()
      }
    } else {
      this.player.setSong(song)
      this.player.continueSong()
    }
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }
}
