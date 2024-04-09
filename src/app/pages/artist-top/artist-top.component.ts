import { Component } from '@angular/core';
import { Subject, debounceTime, take } from 'rxjs';
import { Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SongComponent } from "../../components/song/song.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
    selector: 'app-artist-top',
    standalone: true,
    templateUrl: './artist-top.component.html',
    styleUrls: ['./artist-top.component.css'],
    imports: [CommonModule, SongComponent, InfiniteScrollModule, LoaderComponent]
})
export class ArtistTopComponent {
  public songs!: Track[]
  public currentMaxIndex: number = 15
  public isLoadedAll: boolean = false
  public isLoading: boolean = false
  public id!: number
  public subject = new Subject<any>()

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

    this.subject.pipe(debounceTime(300)).subscribe(() => {
      this.isLoading = true
      this.currentMaxIndex += 15
      const numberOfTracks = 15
      this.api.getArtistTop(this.id, numberOfTracks, this.currentMaxIndex).pipe(take(1)).subscribe((res) => {
        this.songs = this.songs.concat(res.data)
        this.isLoadedAll = res.total === this.songs.length
        this.isLoading = false
      })
    })
  }

  loadMoreItems(event: any) {
    const isScrolledToBottom = event.target.offsetHeight + event.target.scrollTop < event.target.scrollHeight - 400
    if (isScrolledToBottom || this.isLoadedAll || this.isLoading) return
    this.subject.next(0)
  }
}
