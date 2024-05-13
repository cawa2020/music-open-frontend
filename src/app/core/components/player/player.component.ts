import { AfterViewChecked, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
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
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  providers: [HttpClientModule],
  imports: [TooltipDirective, SlidingTextDirective, RouterLink, RouterLinkActive, FormsModule, HttpClientModule, ZenComponent, ControlsComponent, SliderTimeComponent, VolumeEditorComponent, TimePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  public zen: boolean = false
  public song: Song | undefined = undefined

  public currentTime!: number
  public duration!: number
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false

  constructor(private player: PlayerService, private songData: SongService, private userService: UserService, private cookie: CookieService) { }

  ngOnInit() {
    const audio = this.player.getAudio()

    audio.addEventListener('canplaythrough', () => {
      this.duration = Number(audio.duration.toFixed(1))
    })

    audio.addEventListener('timeupdate', () => {
      this.currentTime = this.player.getAudio().currentTime
    })

    this.songData.changes.pipe(filter(el => el === 'song')).subscribe(el => {
      const currentSong = this.songData.getSong()
      if (!currentSong) return
      this.song = currentSong
    })
  }

  onToggleZen(newValue?: boolean) {
    if (!this.player.getAudio().src.length) return
    this.zen = newValue != undefined ? newValue : !this.zen
  }

  isLastElement(index: number): boolean {
    return index === (this.song?.contributors?.length ?? 1) - 1
  }

  addToFavorite() {
    const token = this.cookie.get('access_token')
    if (!this.song) return
    this.userService.addToFavotiteSong(this.song, token).subscribe((res) => {
      this.userService.setUser(res)
    })
  }
}
