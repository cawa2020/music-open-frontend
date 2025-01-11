import { Component, computed, ElementRef, HostListener, Signal, ViewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from './services/theme.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/auth.interface';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { fadeInOut } from '../../../shared/animations/fadeInOut';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [RouterLink, MatIconModule, FormsModule, ],
  animations: [fadeInOut],
})
export class NavComponent {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private routerService = inject(Router);
  private modalService = inject(ModalService);

  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false
  public index: number = 0
  public user: Signal<User | null> = computed(() => this.userService.user())
  public isLoading = computed(() => (this.authService.getIsAuth()() === null))
  public currentPath: string | null = null
  @ViewChild('menu') menu: ElementRef | undefined
  @ViewChild('menuIcon') menuIcon!: ElementRef

  get currentTheme() {
    return this.themeService.getMode()
  }

  get userFirstLetter() {
    return this.user()?.username.at(0)
  }

  ngOnInit() {
    this.routerService.events.subscribe((val: any) => {
      const path: string = val.url
      if (!path) return
      this.currentPath = val.url
    });

    const isThemeDark = localStorage.getItem('themeMode') === 'dark'
    if (isThemeDark) { this.themeService.toggleMode() }
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
    this.themeService.toggleMode()
  }

  changeColor(newColor: string) {
    this.color = newColor
    this.themeService.changeMainColor(newColor)
    localStorage.setItem('mainColor', newColor)
  }

  openModal(type: 'registration' | 'login') {
    this.modalService.openModal(AuthFormComponent, { type: type })
  }

  logout() {
    this.authService.logout()
  }

  isCurrentPath(path: string): boolean {
    return this.currentPath?.includes(path) ?? false
  }
}
