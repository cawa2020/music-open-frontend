import { Component, computed, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-song-page',
  standalone: true,
  imports: [LoaderComponent, RouterLink, ModalComponent, CommonModule, TimePipe, PlayButtonComponent, FavoriteButtonComponent],
  templateUrl: './song-page.component.html',
  styleUrl: './song-page.component.css'
})
export class SongPageComponent implements OnInit {
  public song: Song | null = null;
  public triggerModal = new Subject<boolean>()

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.initSong()
  }

  toggleFullCover() {
    this.triggerModal.next(true)
  }

  private initSong() {
    this.route.params.subscribe((params) => {
      this.song = null
      const id = Number(params['id']);
      this.api.getSong(id).subscribe((res) => {console.log(res); this.song = res});
    });
  }
}
