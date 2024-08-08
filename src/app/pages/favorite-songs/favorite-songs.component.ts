import { Component, effect, OnInit } from '@angular/core';
import { Song } from '../../shared/interfaces/song.interface';
import { UserService } from '../../core/services/user.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { SongComponent } from "../../shared/components/song/song.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorite-songs',
  standalone: true,
  templateUrl: './favorite-songs.component.html',
  styleUrl: './favorite-songs.component.css',
  imports: [LoaderComponent, SongComponent]
})
export class FavoriteSongsComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  public songs: Song[] | undefined

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      if (!user) return
      this.songs = user.favoriteSongs
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
