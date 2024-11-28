import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../interfaces/song.interface';
import { filter, map, take, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Album } from '../../interfaces/album.interface';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css',

})
export class PlayButtonComponent {
  @Input() queue: Song[] = []
  @Input() linkToQueue: string | null = null
  public isPlaying = false

  constructor(private songData: SongService, private audio: AudioService, private api: ApiService) { }

  ngOnInit() {
    this.initIsPlaying()
  }

  play() {
    if (this.linkToQueue && !this.queue.length) {
      this.getQueueFromLink()
    } else {
      this.playQueue()
    }
  }

  private initIsPlaying() {
    this.audio.audioChanges
      .pipe(filter((el) => el.type === 'time'))
      .subscribe((el) => this.isPlaying = el.data && this.songData.compareQueues(this.queue));
  }

  private getQueueFromLink() {
    const albumId = Number(this.linkToQueue?.split('/').at(-2));

    this.api.getAlbum(albumId).pipe(
      switchMap(album => this.api.getAlbumTracks(albumId).pipe(
        map(res => res.data.map(track => ({ ...track, album })))
      ))
    ).subscribe(queue => {
      this.queue = queue;
      this.playQueue()
    });
  }

  private playQueue() {
    if (this.songData.compareQueues(this.queue)) {
      if (this.isPlaying) {
        this.audio.pauseSong()
      } else {
        this.audio.playSong()
      }
    } else {
      this.songData.setQueue(this.queue)
      this.audio.setSong(this.queue[0])
      this.audio.playSong()
    }
  }
}
