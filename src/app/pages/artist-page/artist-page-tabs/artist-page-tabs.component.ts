import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from "../../../pages/artist-page/home/home.component";
import { AlbumsComponent } from "../../../pages/artist-page/albums/albums.component";
import { SinglesComponent } from "../../../pages/artist-page/singles/singles.component";
import { RelatedComponent } from "../../../pages/artist-page/related/related.component";
import { artistTabs } from '../../../shared/constants/app.constant';
import { ArtistTab } from '../../../shared/interfaces/app.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-artist-page-tabs',
  standalone: true,
  imports: [HomeComponent, AlbumsComponent, SinglesComponent, RelatedComponent],
  templateUrl: './artist-page-tabs.component.html',
  styleUrl: './artist-page-tabs.component.css'
})
export class ArtistPageTabsComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @Input() id!: number
  public tabs: { value: ArtistTab, title: string }[] = artistTabs
  public currentTab: ArtistTab = 'home'

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query: any) => {
      this.currentTab = query.tab ?? 'home'
    })
  }

  changeTab(tab: ArtistTab) {
    this.currentTab = tab
    this.router.navigate([], { queryParams: { tab: tab } })
  }
}
