import {
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { SongService } from '../../../core/services/song.service';
import { Observable, filter, map, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../pipes/time.pipe';
import { Song } from '../../interfaces/song.interface';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';
import { UserApiService } from '../../../core/services/user-api.service';
import { ContextMenuService } from '../../../core/services/context-menu.service';
import { FavoriteButtonComponent } from "../favorite-button/favorite-button.component";
import { ModalComponent } from "../../../core/components/modal/modal.component";
import { Playlist } from '../../interfaces/playlist.interface';
import { SongFormSaveToPlaylistComponent } from "./components/song-form-save-to-playlist/song-form-save-to-playlist.component";

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
    ModalComponent,
    SongFormSaveToPlaylistComponent
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
  public triggerModal = new Subject<boolean>();
  public isCurrentSong: boolean = false;

  constructor(
    private audio: AudioService,
    private songData: SongService,
    private userService: UserService,
    private toast: ToastService,
    private contextMenuService: ContextMenuService,
    private userApiService: UserApiService,
    private router: Router
  ) {
    effect(() => {
      this.isCurrentSong = this.checkIsCurrentSong()
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

  hideModal() {
    this.triggerModal.next(false)
  }

  toggleActions(event: MouseEvent) {
    event.preventDefault()
    const parent = (event.target as HTMLElement).parentElement
    const height = parent?.clientHeight ?? 0
    const coords = parent?.getBoundingClientRect() ?? { x: 0, y: 0 }
    const items = [
      { title: 'Добавить в очередь', event: () => { this.songData.addToQueue([this.song]) } },
      { title: 'Добавить в избранное', event: () => { this.toggleFavorite() } },
      { title: 'Перейти к артисту', event: () => { this.router.navigate(['/artist', this.song.artist.id]) } },
      { title: 'Перейти к альбому', event: () => { this.router.navigate(['/album', this.song.album.id]) } },
      { title: 'Добавить в плейлист', event: () => { this.addToPlaylist() } }
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

  private toggleFavorite() {
    this.userApiService.addToFavotiteSong(this.song).subscribe((res) => {
      if (res?.id) {
        this.userService.setUser(res);
      } else if (res !== null) {
        this.toast.error('Что-то пошло не так...');
      }
    });
  }

  private checkIsCurrentSong() {
    const isSameSong = this.song.id === this.songData.getSong()?.id;
    if (!isSameSong) return false;
    return this.songData.compareQueues(this.queue);
  }

  private addToPlaylist() {
    this.triggerModal.next(true)
  }
}
