import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Song } from '../../shared/interfaces/song.interface';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { ModalComponent } from "../../core/components/modal/modal.component";
import { filter, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TimePipe } from "../../shared/pipes/time.pipe";
import { PlayButtonComponent } from "../../shared/components/play-button/play-button.component";
import { FavoriteButtonComponent } from "../../shared/components/favorite-button/favorite-button.component";
import { ModalService } from '../../core/services/modal.service';
import { FullCoverComponent } from '../../shared/components/full-cover/full-cover.component';

@Component({
  selector: 'app-song-page',
  standalone: true,
  imports: [LoaderComponent, RouterLink, CommonModule, TimePipe, PlayButtonComponent, FavoriteButtonComponent],
  templateUrl: './song-page.component.html',
  styleUrl: './song-page.component.css'
})
export class SongPageComponent implements OnInit {
  private modal = inject(ModalService)
  private api = inject(ApiService)
  private route = inject(ActivatedRoute)
  public song: Song | null = null;

  ngOnInit() {
    this.initSong()
  }

  openFullCover() {
    this.modal.openModal(FullCoverComponent, { img: this.song?.album.cover_xl })
  }

  private initSong() {
    this.route.params.subscribe((params) => {
      this.song = null
      const id = Number(params['id']);
      this.api.getSong(id).subscribe((res) => this.song = res);
    });
  }
}
