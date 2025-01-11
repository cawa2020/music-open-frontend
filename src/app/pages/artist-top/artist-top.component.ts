import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SongComponent } from "../../shared/components/song/song.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { Song } from '../../shared/interfaces/song.interface';

@Component({
  selector: 'app-artist-top',
  standalone: true,
  templateUrl: './artist-top.component.html',
  styleUrls: ['./artist-top.component.css'],
  imports: [CommonModule, SongComponent, LoaderComponent]
})
export class ArtistTopComponent implements OnInit {
  public songs: Song[] = []
  public isLoadedAll: boolean = false
  public isLoading: boolean = false
  public id!: number

  constructor(private api: ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = Number(params["id"])
      const defNumberOfTracks = 30
      this.getMoreSongs(defNumberOfTracks, 0)
    });
  }

  loadMoreItems(event: any) {
    const offset = 600
    const isScrolledToBottom = event.target.offsetHeight + event.target.scrollTop < event.target.scrollHeight - offset
    if (isScrolledToBottom || this.isLoadedAll || this.isLoading) return
    this.isLoading = true
    const lastIndex = this.songs.length
    const amount = 10
    this.getMoreSongs(amount, lastIndex)
  }

  private getMoreSongs(amount: number, index: number) {
    this.api.getArtistTop(this.id, amount, index).pipe(take(1)).subscribe((res) => {
      this.songs = this.songs.concat(res.data)
      this.isLoadedAll = res.total === this.songs.length
      this.isLoading = false
    })
  }
}
