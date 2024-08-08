import {
  Component,
  Input,
  OnInit,
  effect,
} from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SongService } from '../../../core/services/song.service';
import { Observable, filter, map, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../pipes/time.pipe';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { Song } from '../../interfaces/song.interface';
import { UserService } from '../../../core/services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-song',
  standalone: true,
  templateUrl: './song.component.html',
  styleUrl: './song.component.css',
  imports: [
    MatIconModule,
    RouterLink,
    CommonModule,
    TimePipe,
    TooltipDirective,
    LoaderComponent,
  ],
})
export class SongComponent implements OnInit {
  @Input({ required: true }) song!: Song;
  @Input({ required: true }) queue!: Song[];
  @Input({ required: true }) index!: number;
  @Input() hideImg?: boolean;
  @Input() hideAlbum?: boolean;
  @Input() hideArtist?: boolean;
  @Input() hideIndex?: boolean;
  public isPlaying$!: Observable<boolean>;
  public isCurrentSong: boolean = false;
  public isFavorite: boolean = false;
  public isFavotiteLoading: boolean = false;

  constructor(
    private audio: AudioService,
    private songData: SongService,
    private userService: UserService,
    private toast: ToastService
  ) {
    effect(() => {
      this.isCurrentSong = this.checkIsCurrentSong()
      const user = this.userService.getUser()
      this.isFavorite = user?.favoriteSongs.some((el: Song) => el.id === this.song.id) ?? false
    })
  }

  ngOnInit(): void {
    this.isPlaying$ = this.audio.audioChanges.pipe(
      filter((el) => el.type === 'time'),
      map((el) => el.data)
    );
  }

  setTrack() {
    if (this.checkIsCurrentSong()) {
      const isPlaying = !this.audio.getAudio().paused;
      if (isPlaying) {
        this.audio.pauseSong();
      } else {
        this.audio.playSong();
      }
    } else {
      if (!this.songData.compareQueues(this.queue)) {
        this.songData.setQueue(this.queue);
      }

      const song = this.queue[this.index];
      this.audio.setSong(song);
      this.audio.playSong();
    }
  }

  isLastSong(index: number): boolean {
    return index === (this.song.contributors?.length ?? 1) - 1;
  }

  toggleFavorite() {
    this.isFavotiteLoading = true;
    this.userService.addToFavotiteSong(this.song).subscribe((res) => {
      if (res?.id) {
        this.userService.setUser(res);
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite) {
          this.toast.success('Песня добавлена в "Избранные треки"');
        } else {
          this.toast.success('Песня убрана из "Избранные треки"');
        }
      } else if (res !== null) {
        this.toast.error('Что-то пошло не так...');
      }
      this.isFavotiteLoading = false;
    });
  }

  private checkIsCurrentSong() {
    const isSameSong = this.song.id === this.songData.getSong()?.id;
    if (!isSameSong) return false;
    return this.songData.compareQueues(this.queue);
  }
}
