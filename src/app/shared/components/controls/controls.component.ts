import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlayerService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { filter } from 'rxjs';
import { Repeat } from '../../interfaces/app.interface';
import { Song } from '../../interfaces/song.interface';

@Component({
  selector: 'app-controls',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controls.component.html',
  styleUrls: [ './controls.component.css'], //'../player/player.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ControlsComponent implements OnInit {
  @Input() color: string = '#fff'
  public isShuffled: boolean = false
  public isPlaying: boolean = false
  public repeat: Repeat = 'none'

  constructor(private player: PlayerService, private songData: SongService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.repeat = this.songData.getRepeat()
    this.isShuffled = this.songData.getShuffle()

    this.player.audioChanges.pipe(filter(el => el.type === 'time')).subscribe(el => {
      this.isPlaying = el.data
      this.cdr.markForCheck()
    })

    this.songData.changes.pipe(filter(el => el === 'repeat')).subscribe(el => {
      this.repeat = this.songData.getRepeat()
    })

    this.songData.changes.pipe(filter(el => el === 'shuffle')).subscribe(el => {
      this.isShuffled = this.songData.getShuffle()
    })
  }

  shuffleSongs(queue: Song[]): Song[] {
    const arr = JSON.parse(JSON.stringify(queue))

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }

  toggleShuffle() {
    this.songData.setShuffle(!this.isShuffled)
    if (this.isShuffled) {
      const queue: Song[] = this.songData.getQueue()
      if (!queue) return
      this.songData.setUnshQueue(JSON.parse(JSON.stringify(queue)))
      this.songData.setQueue(this.shuffleSongs(queue))
    } else {
      this.songData.setQueue(this.songData.getUnshQueue())
    }
  }

  toggleRepeat() {
    switch (this.songData.getRepeat()) {
      case 'none': this.songData.setRepeat('playlist'); break
      case 'playlist': this.songData.setRepeat('song'); break
      case 'song': this.songData.setRepeat('none'); break
    }
  }

  toggleTrack() {
    if (!this.player.getAudio().src.length) return
    if (this.player.getAudio().ended) {
      this.player.setTime(0)
    }

    if (this.player.getAudio().paused) {
      this.player.playSong()
    } else {
      this.player.pauseSong()
    }
  }

  nextSong() {
    if (!this.player.getAudio().src.length) return
    this.player.skipSong('next')
  }

  prevSong() {
    if (!this.player.getAudio().src.length) return
    this.player.skipSong('prev')
  }
}
