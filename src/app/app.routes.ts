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
import { LibraryComponent } from './pages/library/library.component';
import { FavoriteArtistsComponent } from './pages/favorite-artists/favorite-artists.component';
import { FavoritePlaylistsComponent } from './pages/favorite-playlists/favorite-playlists.component';
import { FavoriteSongsComponent } from './pages/favorite-songs/favorite-songs.component';
import { FavoriteAlbumsComponent } from './pages/favorite-albums/favorite-albums.component';

export const routes: Routes = [
  {
    path: 'home', component: MainComponent, pathMatch: 'full'
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
    path: 'favorite/albums', component: FavoriteAlbumsComponent, canActivate: [authGuard]
  },
  {
    path: 'favorite/artists', component: FavoriteArtistsComponent, canActivate: [authGuard]
  },
  {
    path: 'favorite/playlists', component: FavoritePlaylistsComponent, canActivate: [authGuard]
  },
  {
    path: 'favorite/songs', component: FavoriteSongsComponent, canActivate: [authGuard]
  },
  {
    path: 'library', component: LibraryComponent, canActivate: [authGuard]
  },
  {
    path: 'profile/:id', component: ProfileComponent, canActivate: [authGuard]
  },
  {
    path: '**', component: NotFoundComponent
  },
];
