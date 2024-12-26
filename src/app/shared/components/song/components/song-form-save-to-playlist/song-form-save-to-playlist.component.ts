import { ChangeDetectionStrategy, Component, computed, inject, input, output, Signal, signal } from '@angular/core';
import { CreatePlaylist, Playlist } from '../../../../interfaces/playlist.interface';
import { UserService } from '../../../../../core/services/user.service';
import { ApiService } from '../../../../../core/services/api.service';
import { Song } from '../../../../interfaces/song.interface';

@Component({
  selector: 'app-song-form-save-to-playlist',
  standalone: true,
  imports: [],
  templateUrl: './song-form-save-to-playlist.component.html',
  styleUrl: './song-form-save-to-playlist.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongFormSaveToPlaylistComponent {
  private userService = inject(UserService)
  private apiService = inject(ApiService)

  public song = input.required<Song>()
  public hideModal = output<void>()
  public playlists = computed<Playlist[]>(() => this.userService.user()?.playlists ?? [])

  onSubmit(event: Event) {
    event.preventDefault()
    const body: CreatePlaylist = {
      title: this.song().title,
      songs: [this.song()]
    }
    this.apiService.createPlaylist(body)
  }

  closeModal() {
    this.hideModal.emit()
  }

  createPlaylist() {
    const body: CreatePlaylist = {
      title: this.song().title,
      songs: [this.song()]
    }
    this.apiService.createPlaylist(body)
  }
}
