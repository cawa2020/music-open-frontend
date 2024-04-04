import { Component } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Track } from '../../interfaces/app.interface';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SongComponent } from "../../components/song/song.component";

@Component({
  selector: 'app-artist-top',
  standalone: true,
  templateUrl: './artist-top.component.html',
  styleUrl: './artist-top.component.css',
  imports: [CommonModule, SongComponent]
})
export class ArtistTopComponent {
  public songs!: Track[]
  public currentMaxIndex: number = 0
  public isLoadedAll: boolean = false
  public id!: number

  constructor(private api: ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = Number(params["id"])
      this.api.getArtistTop(this.id, 15).pipe(take(1)).subscribe((res) => {
        this.songs = res.data
        this.isLoadedAll = res.total === this.songs.length
      })
    });
  }

  loadMore() {
    this.currentMaxIndex += 15
    this.api.getArtistTop(this.id, 15, this.currentMaxIndex).pipe(take(1)).subscribe((res) => {
      this.songs = this.songs.concat(res.data)
      this.isLoadedAll = res.total === this.songs.length
    })
  }
}
