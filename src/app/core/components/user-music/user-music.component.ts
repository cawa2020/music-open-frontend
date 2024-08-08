import { Component, OnInit, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../../shared/interfaces/auth.interface';
import { fadeFromTop } from '../../../shared/animations/fadeFromTop';
import { fadeToTop } from '../../../shared/animations/fadeToTop';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { sideBarLinks } from '../../../shared/interfaces/app.interface';
import { UserMusicItemComponent } from './user-music-item/user-music-item.component';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";

interface sideBarItem {
  icon: string,
  path: string,
  title: string
}

@Component({
  selector: 'app-user-music',
  standalone: true,
  imports: [RouterLink, DragDropModule, UserMusicItemComponent, LoaderComponent],
  templateUrl: './user-music.component.html',
  styleUrls: ['./user-music.component.css', '../nav/nav.component.css'],
  animations: [fadeFromTop, fadeToTop]
})
export class UserMusicComponent implements OnInit {
  public user: User | null = null;
  public isPinsOpen = false
  public isAuth = false
  public isLoading = true
  public currentPath!: string
  public sideBarItems: sideBarItem[] = []

  get isSideBarActive() {
    return sideBarLinks.find(el => el.path === this.currentPath) || this.currentPath === '/library'
  }

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if (user === undefined) return
      this.user = user;
      this.isAuth = this.user !== null
      this.isLoading = false
    });

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

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.sideBarItems, event.previousIndex, event.currentIndex);
    localStorage.setItem('sideBar', JSON.stringify(this.sideBarItems))
  }
}
