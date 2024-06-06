import { Component, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../../shared/interfaces/auth.interface';
import { fadeFromTop } from '../../../shared/animations/fadeFromTop';
import { fadeToTop } from '../../../shared/animations/fadeToTop';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location, LocationStrategy } from '@angular/common';
import { first } from 'rxjs';
import { sideBarLinks } from '../../../shared/interfaces/app.interface';

interface sideBarItem {
  icon: string,
  path: string,
  title: string
}

@Component({
  selector: 'app-user-music',
  standalone: true,
  imports: [RouterLink, DragDropModule],
  templateUrl: './user-music.component.html',
  styleUrls: ['./user-music.component.css', '../nav/nav.component.css'],
  animations: [fadeFromTop, fadeToTop]
})
export class UserMusicComponent implements OnInit {
  public user: User | null = null;
  public isPlaylistsOpen: boolean = false
  public isPinsOpen: boolean = false
  public currentPath!: string
  public sideBarItems: sideBarItem[] = []

  get isSideBarActive() {
    return sideBarLinks.find(el => el.path === this.currentPath) || this.currentPath === '/library'
  }

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    effect(() => {
      this.user = this.userService.getUser()
    })
  }

  ngOnInit(): void {
    const localSideBar = localStorage.getItem('sideBar')
    this.sideBarItems = localSideBar ? JSON.parse(localSideBar) : sideBarLinks

    this.router.events.subscribe((val: any) => {
      this.currentPath = val.url
    });
  }

  routeToPlaylist(id: number | string) {
    const url = 'playlist/' + id;
    this.router.navigate([url]);
  }

  togglePlaylists() {
    this.isPlaylistsOpen = !this.isPlaylistsOpen
  }

  togglePins() {
    this.isPinsOpen = !this.isPinsOpen
  }

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.sideBarItems, event.previousIndex, event.currentIndex);
    localStorage.setItem('sideBar', JSON.stringify(this.sideBarItems))
  }
}
