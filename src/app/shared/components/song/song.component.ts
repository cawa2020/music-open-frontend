import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PlayerService } from '../../../core/services/audio.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SongService } from '../../../core/services/song.service';
import { Observable, filter, map, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TimePipe } from "../../pipes/time.pipe";
import { TooltipDirective } from '../../directives/tooltip.directive';
import { Song } from '../../interfaces/song.interface';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from '../../../core/services/cookie.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-song',
  standalone: true,
  templateUrl: './song.component.html',
  styleUrl: './song.component.css',
  imports: [MatIconModule, RouterLink, CommonModule, TimePipe, TooltipDirective, LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SongComponent implements OnInit {
  @Input({ required: true }) song!: Song
  @Input({ required: true }) queue!: Song[]
  @Input({ required: true }) index!: number
  @Input() hideImg?: boolean
  @Input() hideAlbum?: boolean
  @Input() hideArtist?: boolean
  @Input() hideIndex?: boolean
  public isPlaying$!: Observable<boolean>
  public isCurrentSong$!: Observable<boolean>
  public isFavorite: boolean = false
  public isFavotiteLoading: boolean = false

  constructor(private player: PlayerService, private songData: SongService, private userService: UserService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.isPlaying$ = this.player.audioChanges.pipe(filter(el => el.type === 'time'), map(el => el.data))
    this.isCurrentSong$ = this.songData.changes.pipe(filter(el => el === 'song'), map(el => this.isCurrentSong()))
    this.userService.changes.pipe(take(1)).subscribe(() => {
      const user = this.userService.getUser()
      if (user?.favoriteSongs.find((el: Song) => el.id === this.song.id)) {
        this.isFavorite = true
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isCurrentSong()
  }

  setTrack() {
    if (this.isCurrentSong()) {
      const isPlaying = !this.player.getAudio().paused
      if (isPlaying) {
        this.player.pauseSong()
      } else {
        this.player.playSong()
      }
    } else {
      if (!this.songData.compareQueues(this.queue)) {
        this.songData.setQueue(this.queue)
      }

      const song = this.queue[this.index]
      this.player.setSong(song)
      this.player.playSong()
    }
  }

  get favoriteIcon(): string {
    return this.isFavorite ? 'heart' : 'heart-outline'
  }

  isLastSong(index: number): boolean {
    return index === (this.song.contributors?.length ?? 1) - 1
  }

  toggleFavorite() {
    this.isFavotiteLoading = true
    const token = this.cookie.get('access_token')
    this.userService.addToFavotiteSong(this.song, token).subscribe((res) => {
      if (res.id) {
        this.userService.setUser(res)
        this.isFavorite = !this.isFavorite
      }
      this.isFavotiteLoading = false
    })
  }

  private isCurrentSong() {
    const isSameSong = this.song.id === this.songData.getSong()?.id
    if (!isSameSong) return false
    return this.songData.compareQueues(this.queue)
  }
}
