import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RoutesRecognized } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, pairwise } from 'rxjs';
import { Location } from '@angular/common';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/interfaces/playlist.interface';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, AuthModalComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  providers: [Document],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WidgetComponent implements OnInit {
  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false
  public index: number = 0
  public modal: 'registration' | 'login' | null = null
  public user: null | User = null

  constructor(public theme: ThemeService, private location: Location, private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    const isThemeDark = localStorage.getItem('themeMode') === 'dark'
    if (isThemeDark) { this.theme.toggleMode() }
    this.changeColor(this.color)

    this.userService.userChanges.subscribe(() => {
      const user = this.userService.getUser()
      this.user = user
    })
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    // console.log(event.target)
    // if (this.excludedElement && !this.excludedElement.nativeElement.contains(event.target as Node)) {
    //   this.toggleMenu()
    // }
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
}
