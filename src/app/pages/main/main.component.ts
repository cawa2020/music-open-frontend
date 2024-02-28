import { Component } from '@angular/core';
import { CurrentPlaylistComponent } from "./current-playlist/current-playlist.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [CurrentPlaylistComponent]
})
export class MainComponent {

}
