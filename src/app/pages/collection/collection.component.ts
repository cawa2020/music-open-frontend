import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { PlayerService } from '../../core/services/audio.service';
import { Collection } from '../../shared/interfaces/collection.interface';
import { SongService } from '../../core/services/song.service';
import { CookieService } from '../../core/services/cookie.service';
import { UserService } from '../../core/services/user.service';
import { Song } from '../../shared/interfaces/song.interface';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { PlayButtonComponent } from "../../shared/components/play-button/play-button.component";
import { SongComponent } from "../../shared/components/song/song.component";

@Component({
  selector: 'app-collection',
  standalone: true,
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css', '../album-page/album-page.component.css'],
  imports: [LoaderComponent, PlayButtonComponent, SongComponent]
})
export class CollectionComponent {
  public songs!: Song[]
  public isPlaying: boolean = false
  public loading: boolean = true

  constructor(private route: ActivatedRoute, private player: PlayerService, private songData: SongService, private userService: UserService) { }

  ngOnInit() {
    this.player.audioChanges.pipe(filter(el => el.type === 'time')).subscribe(el => {
      this.isPlaying = el.data && this.songData.compareQueues(this.songs ?? [])
    })

    this.userService.changes.pipe(take(1)).subscribe(() => {
      this.loading = true
      const user = this.userService.getUser()
      console.log(user)
      if (!user) return
      this.songs = this.userService.getUser()?.favoriteSongs ?? []
      this.loading = false
    })
  }

  get cover() {
    const type = this.route.snapshot.paramMap.get('type')
    switch (type) {
      case 'songs': return 'https://misc.scdn.co/liked-songs/liked-songs-300.png'
      default: return '../../assets/placeholder.jpg'
    }
    return
  }
}
