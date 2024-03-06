import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  public id: number | undefined;
  
  constructor(private activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe(params => this.id = params["id"]);
  }
}
