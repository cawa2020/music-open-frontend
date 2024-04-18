import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RoutesRecognized } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, pairwise } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  providers: [Document]
})
export class WidgetComponent implements OnInit {
  @ViewChild('excludedElement') excludedElement: ElementRef | undefined;
  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false
  public index: number = 0

  constructor(public theme: ThemeService, private router: Router, private location: Location) { }

  ngOnInit() {
    const isThemeDark = localStorage.getItem('themeMode') === 'dark'
    if (isThemeDark) { this.theme.toggleMode() }
    this.changeColor(this.color)
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
}
