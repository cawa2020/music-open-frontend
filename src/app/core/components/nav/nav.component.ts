import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [RouterLink, PlayerComponent, MatIconModule, FormsModule, AuthModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [fadeIn, fadeOut],
})
export class NavComponent {
  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false
  public index: number = 0
  public modal: 'registration' | 'login' | null = null
  public user: null | User = null
  @ViewChild('menu') menu: ElementRef | undefined
  @ViewChild('menuIcon') menuIcon!: ElementRef

  constructor(private theme: ThemeService, private location: Location, private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    const isThemeDark = localStorage.getItem('themeMode') === 'dark'
    if (isThemeDark) { this.theme.toggleMode() }
    this.changeColor(this.color)

    this.userService.changes.subscribe(() => {
      const user = this.userService.getUser()
      this.user = user
    })
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

  move(direction: 'next' | 'prev') {
    if (direction == 'next') {
      this.location.forward()
      this.index++
    } else {
      this.location.back()
      this.index--
    }
  }

  setModal(type: 'registration' | 'login' | null) {
    this.modal = type
  }

  logout() {
    this.auth.logout()
  }

  get themeIcon() {
    return this.theme.getMode() === 'light' ? 'sunny' : 'moon'
  }

  get currentTheme() {
    return this.theme.getMode()
  }
}
