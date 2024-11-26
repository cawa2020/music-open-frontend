import { Component, OnInit, Signal, computed, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../../shared/interfaces/auth.interface';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { sideBarLinks } from '../../../shared/interfaces/app.interface';
import { UserMusicItemComponent } from './user-music-item/user-music-item.component';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from "../modal/modal.component";
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { scaleInOut } from '../../../shared/animations/scaleInOut';
import { Subject } from 'rxjs';

interface sideBarItem {
  icon: string,
  path: string,
  title: string
}

@Component({
  selector: 'app-user-music',
  standalone: true,
  imports: [RouterLink, DragDropModule, UserMusicItemComponent, LoaderComponent, ModalComponent, AuthFormComponent],
  templateUrl: './user-music.component.html',
  styleUrls: ['./user-music.component.css', '../nav/nav.component.css'],
  animations: [scaleInOut]
})
export class UserMusicComponent implements OnInit {
  public modal: 'registration' | 'login' = 'registration'
  public user: Signal<User | null> = computed(() => this.userService.user())
  public isLoading = computed(() => (this.authService.getIsAuth()() === null))
  public isAuth = this.authService.getIsAuth()
  public isPinsOpen = false
  public currentPath!: string
  public sideBarItems: sideBarItem[] = []
  public triggerModal = new Subject<boolean>()

  get isSideBarActive() {
    return sideBarLinks.find(el => el.path === this.currentPath) || this.currentPath === '/library'
  }

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

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

  setModal(type: 'registration' | 'login') {
    this.triggerModal.next(true)
    this.modal = type
  }

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.sideBarItems, event.previousIndex, event.currentIndex);
    localStorage.setItem('sideBar', JSON.stringify(this.sideBarItems))
  }
}
