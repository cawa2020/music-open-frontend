import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from './services/theme.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { User } from '../../../shared/interfaces/auth.interface';
import { fadeIn } from '../../../shared/animations/fadeIn';
import { fadeOut } from '../../../shared/animations/fadeOut';
import { scaleIn } from '../../../shared/animations/scaleIn';
import { scaleOut } from '../../../shared/animations/scaleOut';
import { sideBarLinks } from '../../../shared/interfaces/app.interface';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [RouterLink, PlayerComponent, MatIconModule, FormsModule, AuthModalComponent],
  animations: [fadeIn, fadeOut, scaleIn, scaleOut],
})
export class NavComponent {
  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false
  public index: number = 0
  public modal: 'registration' | 'login' | null = null
  public user: null | User = null
  public currentPath: string | null = null
  @ViewChild('menu') menu: ElementRef | undefined
  @ViewChild('menuIcon') menuIcon!: ElementRef

  get currentTheme() {
    return this.theme.getMode()
  }

  get userFirstLetter() {
    return this.user?.username.at(0)
  }

  constructor(private theme: ThemeService, private auth: AuthService, private userService: UserService, private router: Router) {
    effect(() => {
      this.user = this.userService.getUser()
    })
  }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      const path: string = val.url
      if (!path) return
      this.currentPath = val.url
    });

    const isThemeDark = localStorage.getItem('themeMode') === 'dark'
    if (isThemeDark) { this.theme.toggleMode() }
    this.changeColor(this.color)
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.menu) return
    if (!this.menu.nativeElement.contains(event.target) && !this.menuIcon.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  toggleMode() {
    this.theme.toggleMode()
  }

  changeColor(newColor: string) {
    this.color = newColor
    this.theme.changeMainColor(newColor)
    localStorage.setItem('mainColor', newColor)
  }

  setModal(type: 'registration' | 'login' | null) {
    this.modal = type
  }

  logout() {
    this.auth.logout()
  }

  isCurrentPath(path: string): boolean {
    return this.currentPath?.includes(path) ?? false
  }
}
