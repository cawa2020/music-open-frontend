import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";
import { PlaylistCardComponent } from "../../shared/components/playlist-card/playlist-card.component";
import { User } from '../../shared/interfaces/auth.interface';
import { UserApiService } from '../../core/services/user-api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [LoaderComponent, ArtistComponent, PlaylistCardComponent]
})
export class ProfileComponent implements OnInit {
  public user = signal<User | null>(null)
  public loading = computed<boolean>(() => !this.user())

  constructor(private activateRoute: ActivatedRoute, private userApiService: UserApiService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.user.set(null)
      const id = params["id"]
      this.userApiService.fetchUser(id).subscribe((user) => {
        if (!user) return
        this.user.set(user)
      })
    })
  }

}
