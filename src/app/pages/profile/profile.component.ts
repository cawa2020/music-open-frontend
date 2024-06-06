import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { ArtistComponent } from "../../shared/components/artist-card/artist-card.component";
import { PlaylistCardComponent } from "../../shared/components/playlist-card/playlist-card.component";
import { User } from '../../shared/interfaces/auth.interface';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [LoaderComponent, ArtistComponent, PlaylistCardComponent]
})
export class ProfileComponent implements OnInit {
  public loading: boolean = true
  public user!: User

  constructor(private activateRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true
      const id = params["id"]

      if (id === 'me') {
        // this.userService.changes.subscribe(() => {
        //   const newUser = this.userService.getUser()
        //   if (!newUser) return
        //   this.user = newUser
        //   this.loading = false
        // })
      } else {

      }
    })
  }
}
