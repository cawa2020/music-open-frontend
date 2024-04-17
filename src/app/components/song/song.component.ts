import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {
  @Input({ required: true }) song!: Track
  @Input({ required: true }) queue!: Track[]
  @Input({ required: true }) index!: number
  @Input() hideImg?: boolean
  @Input() hideAlbum?: boolean
  @Input() hideArtist?: boolean
  @Input() hideIndex?: boolean
  public isPlaying$!: Observable<boolean>
  public isCurrentSong$!: Observable<boolean>
  public isFavorite: boolean = false

  constructor(private player: PlayerService, private songData: SongService, private formatter: FormatterService) { }

  ngOnInit(): void {
    this.isPlaying$ = this.player.audioChanges.asObservable().pipe(filter(el => el.type === 'time'), map(el => el.data))
    this.isCurrentSong$ = this.songData.changes.asObservable().pipe(filter(el => el === 'song'), map(el => this.isCurrentSong()))
  }

  isCurrentSong() {
    const isSameSong = this.song.id === this.songData.getSong()?.id
    return isSameSong && this.isSameQueue()
  }

  // PLAYBUTTON
  setTrack() {
    if (!this.isSameQueue()) {
      this.songData.setQueue(this.queue)
    }

    const song = this.queue[this.index]
    const isSameSong = song.id === this.songData.getSong()?.id
    if (isSameSong) {
      const isPlaying = !this.player.getAudio().paused
      if (isPlaying) {
        this.player.pauseSong()
      } else {
        this.player.playSong()
      }
    } else {
      this.player.setSong(song)
      this.player.playSong()
    }
  }

  getDuration(duration: number): string {
    return this.formatter.getTime(duration)
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite
  }

  getFavoriteIcon(): string {
    return this.isFavorite ? 'favorite' : 'favorite_border'
  }

  isLastSong(index: number): boolean {
    return index !== (this.song.contributors?.length ?? 1) - 1
  }

  private isSameQueue(): boolean {
    const currQueue = JSON.stringify(this.songData.getQueue())
    const songQueue = JSON.stringify(this.queue)
    return currQueue === songQueue
  }

}
