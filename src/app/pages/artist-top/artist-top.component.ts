import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, take } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SongComponent } from "../../shared/components/song/song.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { Track } from '../../shared/interfaces/track.interface';

@Component({
  selector: 'app-artist-top',
  standalone: true,
  templateUrl: './artist-top.component.html',
  styleUrls: ['./artist-top.component.css'],
  imports: [CommonModule, SongComponent, LoaderComponent]
})
export class ArtistTopComponent implements OnInit {
  public songs!: Track[]
  public isLoadedAll: boolean = false
  public isLoading: boolean = false
  public id!: number

  constructor(private api: ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = Number(params["id"])
      const defNumberOfTracks = 30
      this.api.getArtistTop(this.id, defNumberOfTracks).pipe(take(1)).subscribe((res) => {
        this.songs = res.data
        this.isLoadedAll = res.total === this.songs.length
      })
    });
  }

  loadMoreItems(event: any) {
    const offset = 600
    const isScrolledToBottom = event.target.offsetHeight + event.target.scrollTop < event.target.scrollHeight - offset
    if (isScrolledToBottom || this.isLoadedAll || this.isLoading) return
    const lastIndex = this.songs.length
    const limit = 15
    this.isLoading = true
    this.api.getArtistTop(this.id, limit, lastIndex + 15).pipe(take(1)).subscribe((res) => {
      this.songs = this.songs.concat(res.data)
      this.isLoadedAll = res.total === this.songs.length
      this.isLoading = false
    })
  }
}
