import { Component, HostListener, Input } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { Song } from '../../interfaces/song.interface';
import { Collection } from '../../interfaces/collection.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.css'
})
export class CollectionCardComponent {
  @Input({ required: true }) collection!: Collection
  public showButtons: boolean = false

  constructor(private player: AudioService, private songData: SongService) { }

  playAlbum() {
    const queue: Song[] = this.collection.songs
    this.songData.setQueue(queue)
    this.player.setSong(queue[0])
    this.player.playSong()
  }

  @HostListener('mouseenter')
  onHover() {
    this.showButtons = true
  }

  @HostListener('mouseleave')
  onLeave() {
    this.showButtons = false
  }
}
