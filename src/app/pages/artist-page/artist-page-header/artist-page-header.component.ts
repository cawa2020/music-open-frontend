import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AudioService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { PlayButtonComponent } from '../../../shared/components/play-button/play-button.component';
import { Artist } from '../../../shared/interfaces/artist.interface';
import { Song } from '../../../shared/interfaces/song.interface';

@Component({
  selector: 'app-artist-page-header',
  standalone: true,
  imports: [PlayButtonComponent],
  templateUrl: './artist-page-header.component.html',
  styleUrl: './artist-page-header.component.css'
})
export class ArtistPageHeaderComponent implements OnChanges, OnInit {
  @Input() artist!: Artist
  @Input() queue: Song[] = [];
  public isFavorite = false;
  public isFavoriteLoading = false;
  public isPlaying = false;

  constructor(private userService: UserService,
    private audio: AudioService,
    private songData: SongService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initIsPlaying()
    this.initIsFavorite()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isPlaying = !this.audio.getAudio().paused && this.songData.compareQueues(this.queue);
    const artists = this.userService.getUser()?.favoriteArtists ?? []
    this.isFavorite = artists.some((e) => e.id === this.artist?.id);
  }

  addToFavorite() {
    this.isFavoriteLoading = true
    this.userService.addToFavotiteArtist(this.artist).subscribe((user) => {
      this.isFavoriteLoading = false
      if (!user) return;
      this.isFavorite = !this.isFavorite;
      this.userService.setUser(user)
    });
  }

  private initIsFavorite(): void {
    this.userService.user$.subscribe(user => {
      const favoriteArtists = user?.favoriteArtists ?? []
      const artistId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
      this.isFavorite = favoriteArtists.some(artist => artist.id === artistId);
    });
  }

  private initIsPlaying(): void {
    this.audio.audioChanges
      .pipe(filter((el) => el.type === 'time'))
      .subscribe((el) => { this.isPlaying = el.data && this.songData.compareQueues(this.queue); });
  }
}
