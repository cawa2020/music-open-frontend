import { Component, computed, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AudioService } from '../../../core/services/audio.service';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { PlayButtonComponent } from '../../../shared/components/play-button/play-button.component';
import { Artist } from '../../../shared/interfaces/artist.interface';
import { Song } from '../../../shared/interfaces/song.interface';
import { UserApiService } from '../../../core/services/user-api.service';

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
  public isFavorite = computed(() => {
    const favoriteArtists = this.userService.user()?.favoriteArtists ?? []
    const artistId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    return favoriteArtists.some(artist => artist.id === artistId);
  });

  public isFavoriteLoading = false;
  public isPlaying = false;

  constructor(
    private userService: UserService,
    private userApiService: UserApiService,
    private audio: AudioService,
    private songData: SongService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initIsPlaying()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isPlaying = !this.audio.getAudio().paused && this.songData.compareQueues(this.queue);
  }

  addToFavorite() {
    this.isFavoriteLoading = true
    this.userApiService.addToFavotiteArtist(this.artist).subscribe((user) => {
      this.isFavoriteLoading = false
      if (!user) return;
      this.userService.setUser(user)
    });
  }

  private initIsPlaying(): void {
    this.audio.audioChanges
      .pipe(filter((el) => el.type === 'time'))
      .subscribe((el) => { this.isPlaying = el.data && this.songData.compareQueues(this.queue); });
  }
}
