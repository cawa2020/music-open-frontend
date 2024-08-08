import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

interface sideBarItem {
  icon: string,
  path: string,
  title: string
}

@Component({
  selector: 'app-user-music-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-music-item.component.html',
  styleUrl: './user-music-item.component.css',
})
export class UserMusicItemComponent {
  @Input() item!: sideBarItem
  @Input() currentPath!: string
}
