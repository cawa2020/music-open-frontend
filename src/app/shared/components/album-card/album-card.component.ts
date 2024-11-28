import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../core/services/audio.service';
import { ApiService } from '../../../core/services/api.service';
import { filter, map, take } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { Album, AlbumBrief } from '../../interfaces/album.interface';
import { Song } from '../../interfaces/song.interface';
import { ContextMenuService } from '../../../core/services/context-menu.service';
import { PlayButtonComponent } from "../play-button/play-button.component";
import { FavoriteButtonComponent } from "../favorite-button/favorite-button.component";

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [RouterLink, CommonModule, PlayButtonComponent, FavoriteButtonComponent],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.css',
  animations: []
})

export class AlbumCardComponent {
  @Input({ required: true }) album!: Album | AlbumBrief

  constructor(private contextMenu: ContextMenuService) { }

  pinAlbum(): void {
    console.log('pinned!')
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault()
    this.contextMenu.open({ id: this.album.id.toString(), items: [{ event: this.pinAlbum, title: 'pin album' }], position: [event.clientX, event.clientY] })
  }
}
