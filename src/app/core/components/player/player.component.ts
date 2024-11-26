import { Component, OnInit, Signal, computed, effect } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ZenComponent } from "../zen/zen.component";
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../../../shared/components/controls/controls.component';
import { SliderTimeComponent } from '../../../shared/components/slider-time/slider-time.component';
import { VolumeEditorComponent } from "../../../shared/components/volume-editor/volume-editor.component";
import { TimePipe } from "../../../shared/pipes/time.pipe";
import { SlidingTextDirective } from './directives/sliding-text.directive';
import { TooltipDirective } from '../../../shared/directives/tooltip.directive';
import { Song } from '../../../shared/interfaces/song.interface';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  providers: [HttpClientModule],
  imports: [TooltipDirective, SlidingTextDirective, RouterLink, FormsModule, HttpClientModule, ZenComponent, ControlsComponent, SliderTimeComponent, VolumeEditorComponent, TimePipe]
})
export class PlayerComponent implements OnInit {
  public zen: boolean = false
  public song: Signal<Song | null> = computed(() => this.songData.getSong())
  public isFavorite: Signal<boolean> = computed(() => {
    const songs = this.userService.select('favoriteSongs')
    return songs().some((el: Song) => el.id === this.song()?.id) ?? false
  })
  public isFavotiteLoading: boolean = false;

  constructor(
    private audioService: AudioService,
    private songData: SongService,
    private userService: UserService,
    private userApiService: UserApiService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  toggleFavorite() {
    const song = this.song()
    if (!song) return
    this.isFavotiteLoading = true;
    this.userApiService.addToFavotiteSong(song).subscribe((res) => {
      if (res?.id) {
        this.userService.setUser(res);
        // !!!!!!!!!
        if (this.isFavorite()) {
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

  onToggleZen(newValue?: boolean) {
    if (!this.audioService.getAudio().src.length) return
    this.zen = newValue != undefined ? newValue : !this.zen
  }

  onCurrentTimeChange(newTime: number) {
    this.audioService.setTime(newTime)
  }

  isLastElement(index: number): boolean {
    return index === (this.song()?.contributors?.length ?? 1) - 1
  }

  addToFavorite() {
    const song = this.song()
    if (!song) return
    this.userApiService.addToFavotiteSong(song).subscribe((user) => {
      if (!user) return
      this.userService.setUser(user)
    })
  }
}
