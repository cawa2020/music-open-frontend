import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RoutesRecognized } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { MatIconModule } from '@angular/material/icon';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [RouterLink, SliderComponent, FormsModule, MatIconModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  providers: [Document]
})
export class WidgetComponent {
  @ViewChild('excludedElement') excludedElement: ElementRef | undefined;
  public color: string = localStorage.getItem('mainColor') ?? '#3b82f6'
  public isMenuOpen: boolean = false
  public urls: string[] = []
  public urlIndex: number = 0

  constructor(public theme: ThemeService, private router: Router, private document: Document) { }

  ngOnInit() {
    if (localStorage.getItem('themeMode') === 'dark') {
      this.theme.toggleMode()
    }
    this.changeColor(this.color)
    const startUrl = String(window.location).split('/').pop()
    this.urls.push(startUrl!)

    // ГОВНО НЕ РАБОЧЕЕ
    // this.router.events
    //   .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    //   .subscribe((events: RoutesRecognized[]) => {
    //     const url = events[1].urlAfterRedirects
    //     if (url === this.urls[this.urlIndex + 1]) return
    //     this.urls.unshift(url)
    //   });
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    // console.log(event.target)
    // if (this.excludedElement && !this.excludedElement.nativeElement.contains(event.target as Node)) {
    //   this.toggleMenu()
    // }
  }

  toggleMenu() {
    // console.log('!!!')
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
      this.urlIndex--
      this.router.navigate([this.urls[this.urlIndex]])
    } else {
      this.urlIndex++
      this.router.navigate([this.urls[this.urlIndex]])
    }
  }
}
