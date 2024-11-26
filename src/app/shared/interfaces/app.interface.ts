export type Repeat = 'none' | 'song' | 'playlist';
export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export const sideBarLinks = [
  { icon: 'Pin', path: '/pins', title: 'Закрепленное' },
  { icon: 'Like', path: '/favorite/songs', title: 'Избранные треки' },
  { icon: 'Playlist', path: '/favorite/playlists', title: 'Плейлисты' },
  { icon: 'Album', path: '/favorite/albums', title: 'Альбомы' },
  { icon: 'Artist', path: '/favorite/artists', title: 'Артисты' },
]

export type ArtistTab = 'home' | 'single' | 'album' | 'related'
