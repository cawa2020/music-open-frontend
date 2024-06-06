import { Component, OnInit, effect } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ZenComponent } from "../zen/zen.component";
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../../../shared/components/controls/controls.component';
import { filter } from 'rxjs';
import { SliderTimeComponent } from '../../../shared/components/slider-time/slider-time.component';
import { VolumeEditorComponent } from "../../../shared/components/volume-editor/volume-editor.component";
import { TimePipe } from "../../../shared/pipes/time.pipe";
import { SlidingTextDirective } from './directives/sliding-text.directive';
import { TooltipDirective } from '../../../shared/directives/tooltip.directive';
import { Song } from '../../../shared/interfaces/song.interface';
import { UserService } from '../../services/user.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  providers: [HttpClientModule],
  imports: [TooltipDirective, SlidingTextDirective, RouterLink, RouterLinkActive, FormsModule, HttpClientModule, ZenComponent, ControlsComponent, SliderTimeComponent, VolumeEditorComponent, TimePipe]
})
export class PlayerComponent {
  public zen: boolean = false
  public song: Song | undefined = undefined

  constructor(private audioService: AudioService, private songData: SongService, private userService: UserService) {
    effect(() => {
      const currentSong = this.songData.getSong()
      if (!currentSong) return
      this.song = currentSong
    })
  }

  onToggleZen(newValue?: boolean) {
    if (!this.audioService.getAudio().src.length) return
    this.zen = newValue != undefined ? newValue : !this.zen
  }

  onCurrentTimeChange(newTime: number) {
    this.audioService.setTime(newTime)
  }

  isLastElement(index: number): boolean {
    return index === (this.song?.contributors?.length ?? 1) - 1
  }

  addToFavorite() {
    if (!this.song) return
    this.userService.addToFavotiteSong(this.song).subscribe((res) => {
      this.userService.setUser(res)
    })
  }
}
