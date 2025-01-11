import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../../shared/interfaces/auth.interface';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { sideBarLinks } from '../../../shared/interfaces/app.interface';
import { UserMusicItemComponent } from './user-music-item/user-music-item.component';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { AuthService } from '../../services/auth.service';
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { scaleInOut } from '../../../shared/animations/scaleInOut';
import { ModalService } from '../../services/modal.service';

interface sideBarItem {
  icon: string,
  path: string,
  title: string
}

@Component({
  selector: 'app-user-music',
  standalone: true,
  imports: [DragDropModule, UserMusicItemComponent, LoaderComponent],
  templateUrl: './user-music.component.html',
  styleUrls: ['./user-music.component.css', '../nav/nav.component.css'],
  animations: [scaleInOut]
})
export class UserMusicComponent implements OnInit {
  private router = inject(Router)
  private userService = inject(UserService)
  private authService = inject(AuthService)
  private modalService = inject(ModalService)

  public user: Signal<User | null> = computed(() => this.userService.user())
  public isLoading = computed(() => this.authService.getIsAuth()() === null)
  public isAuth = computed(() => this.authService.getIsAuth()())
  public isPinsOpen = false
  public currentPath!: string
  public sideBarItems: sideBarItem[] = []

  get isSideBarActive() {
    return sideBarLinks.find(el => el.path === this.currentPath) || this.currentPath === '/library'
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

  setModal(type: 'registration' | 'login') {
    this.modalService.openModal(AuthFormComponent, { type: type })
  }

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.sideBarItems, event.previousIndex, event.currentIndex);
    localStorage.setItem('sideBar', JSON.stringify(this.sideBarItems))
  }
}
