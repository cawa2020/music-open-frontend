import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, input, output } from '@angular/core';
import { CreatePlaylist, Playlist } from '../../../../interfaces/playlist.interface';
import { UserService } from '../../../../../core/services/user.service';
import { ApiService } from '../../../../../core/services/api.service';
import { Song } from '../../../../interfaces/song.interface';
import { ToastService } from '../../../../../core/services/toast.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  public form = this.fb.group({ playlists: this.fb.array<FormControl>([]) });
  public playlists = computed<Playlist[]>(() => {
    const playlists_data = this.userService.user()?.playlists ?? []
    playlists_data.map(() => {
      this.form.controls.playlists.push(this.fb.control(false))
    })
    return playlists_data
  })

  ngOnInit() {
    // this.form.controls.playlists.valueChanges.subscribe((el) => {
    //   console.log(el)
    // })
  }

  closeModal() {
    this.modal.closeModal()
  }

  createPlaylist() {
    const body: CreatePlaylist = { title: this.song.title, songs: [this.song] }
    // this.apiService.createPlaylist(body).subscribe(res => {
    //   if (!res.id) return
    //   this.toastService.success(`Плейлист "${res.title}" был успешно создан!`)
    // })
  }
}
