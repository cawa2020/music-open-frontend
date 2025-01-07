import { Component, Signal, computed } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZenComponent } from "../zen/zen.component";
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../../../shared/components/controls/controls.component';
import { SliderTimeComponent } from '../../../shared/components/slider-time/slider-time.component';
import { VolumeEditorComponent } from "../../../shared/components/volume-editor/volume-editor.component";
import { TimePipe } from "../../../shared/pipes/time.pipe";
import { SlidingTextDirective } from './directives/sliding-text.directive';
import { TooltipDirective } from '../../../shared/directives/tooltip.directive';
import { Song } from '../../../shared/interfaces/song.interface';
import { FavoriteButtonComponent } from "../../../shared/components/favorite-button/favorite-button.component";

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  imports: [TooltipDirective, SlidingTextDirective, RouterLink, FormsModule, ZenComponent, ControlsComponent, SliderTimeComponent, VolumeEditorComponent, TimePipe, FavoriteButtonComponent]
})
export class PlayerComponent {
  public zen: boolean = false
  public song: Signal<Song | null> = computed(() => this.songData.getSong())

  constructor(
    private audioService: AudioService,
    private songData: SongService,
  ) { }

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
}
