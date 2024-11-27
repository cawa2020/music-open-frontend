import { Component, computed, ElementRef, HostListener, Signal, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from './services/theme.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/auth.interface';
import { ModalComponent } from "../modal/modal.component";
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { fadeInOut } from '../../../shared/animations/fadeInOut';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [RouterLink, MatIconModule, FormsModule, AuthFormComponent, ModalComponent],
  animations: [fadeInOut],
})
export class NavComponent {
  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false
  public index: number = 0
  public modal: 'registration' | 'login' = 'registration'
  public user: Signal<User | null> = computed(() => this.userService.user())
  public isLoading = computed(() => (this.auth.getIsAuth()() === null))
  public currentPath: string | null = null
  public triggerModal = new Subject<boolean>()
  @ViewChild('menu') menu: ElementRef | undefined
  @ViewChild('menuIcon') menuIcon!: ElementRef

  get currentTheme() {
    return this.theme.getMode()
  }

  get userFirstLetter() {
    return this.user()?.username.at(0)
  }

  constructor(private theme: ThemeService, private auth: AuthService, private userService: UserService, private router: Router) { }

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

  setModal(type: 'registration' | 'login') {
    this.triggerModal.next(true)
    this.modal = type
  }

  logout() {
    this.auth.logout()
  }

  isCurrentPath(path: string): boolean {
    return this.currentPath?.includes(path) ?? false
  }
}
