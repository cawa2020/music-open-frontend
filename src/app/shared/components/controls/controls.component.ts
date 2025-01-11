import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit, Signal, computed } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { filter } from 'rxjs';
import { Repeat } from '../../interfaces/app.interface';

@Component({
  selector: 'app-controls',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'], //'../audio/audio.component.css',
})

export class ControlsComponent implements OnInit {
  @Input() color: string = '#fff'
  public repeat: Signal<Repeat> = computed(() => this.songData.getRepeat()())
  public isShuffled: Signal<boolean> = computed(() => this.songData.getShuffle()())
  public isPlaying: boolean = false

  constructor(private audio: AudioService, private songData: SongService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.audio.audioChanges.pipe(filter(el => el.type === 'time')).subscribe(el => {
      this.isPlaying = el.data
      this.cdr.markForCheck()
    })
  }

  @HostListener('window:keydown', ['$event'])
  onSpaceEvent(e: KeyboardEvent) {
    const isUserTypeInInput = document.activeElement?.tagName === 'INPUT'
    const isKeySpace = e.code === 'Space'
    if (!isKeySpace || isUserTypeInInput) return
    e.preventDefault();
    this.toggleTrack()
  }

  toggleShuffle() {
    this.songData.setShuffle(!this.isShuffled())
  }

  toggleRepeat() {
    switch (this.songData.getRepeat()()) {
      case 'none': this.songData.setRepeat('playlist'); break
      case 'playlist': this.songData.setRepeat('song'); break
      case 'song': this.songData.setRepeat('none'); break
    }
  }

  toggleTrack() {
    if (!this.audio.getAudio().src.length) return
    if (this.audio.getAudio().ended) {
      this.audio.setTime(0)
    }

    if (this.audio.getAudio().paused) {
      this.audio.playSong()
    } else {
      this.audio.pauseSong()
    }
  }

  nextSong() {
    if (!this.audio.getAudio().src.length) return
    this.audio.skipSong('next')
  }

  prevSong() {
    if (!this.audio.getAudio().src.length) return
    this.audio.skipSong('prev')
  }
}
