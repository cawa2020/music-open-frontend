import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SearchComponent } from './pages/search/search.component';
import { ArtistDiscographyComponent } from './pages/artist-discography/artist-discography.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { QueueComponent } from './pages/queue/queue.component';
import { ArtistTopComponent } from './pages/artist-top/artist-top.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { CollectionComponent } from './pages/collection/collection.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent, pathMatch: 'full'
  },
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'artist/:id', component: ArtistPageComponent, pathMatch: 'full'
  },
  {
    path: 'artist/:id/discography', component: ArtistDiscographyComponent
  },
  {
    path: 'artist/:id/top', component: ArtistTopComponent
  },
  {
    path: 'album/:id', component: AlbumPageComponent
  },
  {
    path: 'playlist/:id', component: PlaylistComponent
  },
  {
    path: 'queue', component: QueueComponent
  },
  {
    path: 'collection/:type', component: CollectionComponent, canActivate: [authGuard]
  },
  {
    path: 'profile/:id', component: ProfileComponent, canActivate: [authGuard]
  },
  {
    path: '**', component: NotFoundComponent
  },
];
