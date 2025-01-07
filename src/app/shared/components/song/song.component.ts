import {
  Component,
  Input,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { SongService } from '../../../core/services/song.service';
import { Observable, filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../pipes/time.pipe';
import { Song } from '../../interfaces/song.interface';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';
import { UserApiService } from '../../../core/services/user-api.service';
import { ContextMenuService } from '../../../core/services/context-menu.service';
import { FavoriteButtonComponent } from "../favorite-button/favorite-button.component";
import { SongFormSaveToPlaylistComponent } from "./components/song-form-save-to-playlist/song-form-save-to-playlist.component";
import { ModalService } from '../../../core/services/modal.service';
import { AuthService } from '../../../core/services/auth.service';

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
    FavoriteButtonComponent,
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
  public isCurrentSong = computed(() => this.checkIsCurrentSong());

  private audioService = inject(AudioService);
  private songService = inject(SongService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private contextMenuService = inject(ContextMenuService);
  private userApiService = inject(UserApiService);
  private router = inject(Router);
  private modalService = inject(ModalService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.isPlaying$ = this.audioService.audioChanges.pipe(
      filter((el) => el.type === 'time'),
      map((el) => el.data)
    );
  }

  setTrack() {
    if (this.checkIsCurrentSong()) {
      const isPlaying = !this.audioService.getAudio().paused;
      if (isPlaying) {
        this.audioService.pauseSong();
      } else {
        this.audioService.playSong();
      }
    } else {
      if (!this.songService.compareQueues(this.queue)) {
        this.songService.setQueue(this.queue);
      }

      const song = this.queue[this.index];
      this.audioService.setSong(song);
      this.audioService.playSong();
    }
  }

  isLastSong(index: number): boolean {
    return index === (this.song.contributors?.length ?? 1) - 1;
  }

  toggleActions(event: MouseEvent) {
    event.preventDefault()
    const parent = (event.target as HTMLElement).parentElement
    const height = parent?.clientHeight ?? 0
    const coords = parent?.getBoundingClientRect() ?? { x: 0, y: 0 }
    const items = [
      { title: 'Добавить в очередь', event: () => { this.songService.addToQueue([this.song]) } },
      { title: 'Добавить в избранное', event: () => { this.toggleFavorite() } },
      { title: 'Перейти к артисту', event: () => { this.router.navigate(['/artist', this.song.artist.id]) } },
      { title: 'Перейти к альбому', event: () => { this.router.navigate(['/album', this.song.album.id]) } },
      { title: 'Добавить в плейлист', event: () => { this.openModal() } }
    ]

    if (this.contextMenuService.getEvent().id === this.song.id.toString()) {
      this.contextMenuService.close()
      return
    }

    this.contextMenuService.open({
      parent: parent ?? undefined,
      id: this.song.id.toString(),
      items: items,
      position: [coords.x, coords.y + height + 20]
    })
  }

  private openModal() {
    const isAuth = this.authService.getIsAuth()()
    if (!isAuth) { this.authService.showInfoAboutLogging(); return }
    this.modalService.openModal(SongFormSaveToPlaylistComponent, { song: this.song })
  }

  private toggleFavorite() {
    this.userApiService.addToFavotiteSong(this.song).subscribe((res) => {
      if (res?.id) {
        this.userService.updateUser(res);
      } else if (res !== null) {
        this.toastService.error('Что-то пошло не так...');
      }
    });
  }

  private checkIsCurrentSong() {
    const isSameSong = this.song.id === this.songService.getSong()?.id;
    if (!isSameSong) return false;
    return this.songService.compareQueues(this.queue);
  }
}
