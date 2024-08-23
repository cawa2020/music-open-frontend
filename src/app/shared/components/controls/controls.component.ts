import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, effect } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { filter } from 'rxjs';
import { Repeat } from '../../interfaces/app.interface';
import { Song } from '../../interfaces/song.interface';

@Component({
  selector: 'app-controls',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'], //'../audio/audio.component.css',
})

export class ControlsComponent implements OnInit {
  @Input() color: string = '#fff'
  public isShuffled: boolean = false
  public isPlaying: boolean = false
  public repeat: Repeat = 'none'

  constructor(private audio: AudioService, private songData: SongService, private cdr: ChangeDetectorRef) {
    effect(() => {
      this.isShuffled = this.songData.getShuffle()
      this.repeat = this.songData.getRepeat()
    })
  }

  ngOnInit() {
    this.repeat = this.songData.getRepeat()
    this.isShuffled = this.songData.getShuffle()

    this.audio.audioChanges.pipe(filter(el => el.type === 'time')).subscribe(el => {
      this.isPlaying = el.data
      this.cdr.markForCheck()
    })
  }

  toggleShuffle() {
    this.songData.setShuffle(!this.isShuffled)
  }

  toggleRepeat() {
    switch (this.songData.getRepeat()) {
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
