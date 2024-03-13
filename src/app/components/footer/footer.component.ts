import { Component } from '@angular/core';
import { PlayerComponent } from "../player/player.component";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    imports: [PlayerComponent]
})
export class FooterComponent {

}
