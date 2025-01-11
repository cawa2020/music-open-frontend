import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { CreatePlaylist, Playlist } from '../../../../interfaces/playlist.interface';
import { UserService } from '../../../../../core/services/user.service';
import { ApiService } from '../../../../../core/services/api.service';
import { Song } from '../../../../interfaces/song.interface';
import { ToastService } from '../../../../../core/services/toast.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../../../../core/services/modal.service';

interface FormPlaylist {
  id: number
  title: string
  saveToPlaylist: boolean
}

@Component({
  selector: 'app-song-form-save-to-playlist',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './song-form-save-to-playlist.component.html',
  styleUrl: './song-form-save-to-playlist.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongFormSaveToPlaylistComponent {
  private userService = inject(UserService)
  private modal = inject(ModalService)
  private apiService = inject(ApiService)
  private toastService = inject(ToastService)
  private fb = inject(FormBuilder)

  @Input() song!: Song
  public form = this.fb.group({ playlists: this.fb.array<FormGroup>([]) });
  public playlists = computed<Playlist[]>(() => {
    const playlists_data = this.userService.user()?.playlists ?? []
    playlists_data.map((playlist) => {
      const contoller = this.fb.group(
        {
          isAdded: !!playlist.songs.find((el) => el.id === this.song.id),
          playlistId: playlist.id
        }
      )
      this.form.controls.playlists.push(contoller)
    })
    return playlists_data
  })

  ngOnInit() {
    this.form.controls.playlists.valueChanges.subscribe((currPlaylists) => {
      const prevPlaylists = this.form.value.playlists
      for (const [index, item] of currPlaylists.entries()) {
        const isDifferentLength = prevPlaylists?.length !== currPlaylists.length
        const isSameValue = item.isAdded === prevPlaylists?.[index]
        if (isSameValue || isDifferentLength) continue;
        this.addSongToPlaylist(item.playlistId);
      }
    })
  }

  closeModal() {
    this.modal.closeModal()
  }

  createPlaylist() {
    const body: CreatePlaylist = { title: this.song.title, songs: [this.song] }
    this.apiService.createPlaylist(body).subscribe(playlist => {
      if (!playlist.id) return
      const user = this.userService.user()
      if (!user) return
      const playlists = user.playlists
      this.userService.updateUser({ playlists: [...playlists, playlist] })
      this.toastService.success(`Плейлист "${playlist.title}" был успешно создан!`)
    })
  }

  private addSongToPlaylist(playlistId: number) {
    this.apiService.toggleSongOnPlaylist(this.song, playlistId).subscribe((res) => {
      if (!res.id) return
      const playlists = this.userService.user()?.playlists ?? []
      const playlistIndex = playlists.findIndex((el) => el.id === playlistId)
      playlists[playlistIndex] = res
      this.userService.updateUser({ playlists: playlists })
      this.toastService.success(`Трек "${this.song.title}" был успешно добавлен в "${res.title}"!`)
    })
  }
}
