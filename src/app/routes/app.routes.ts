import { Routes } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ArtistComponent } from '../pages/artist/artist.component';
import { AlbumComponent } from '../pages/album/album.component';
import { PlaylistComponent } from '../pages/playlist/playlist.component';
import { SearchComponent } from '../pages/search/search.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent, pathMatch: 'full'
  },
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'artist/:id', component: ArtistComponent
  },
  {
    path: 'album/:id', component: AlbumComponent
  },
  {
    path: 'playlist/:id', component: PlaylistComponent
  },
  {
    path: '**', component: NotFoundComponent
  },
];
