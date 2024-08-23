export type Repeat = 'none' | 'song' | 'playlist';
export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const sideBarLinks = [
  { icon: 'Pin', path: '/pins', title: 'Закрепленное' },
  { icon: 'Like', path: '/favorite/songs', title: 'Избранные треки' },
  { icon: 'Playlist', path: '/favorite/playlits', title: 'Плейлисты' },
  { icon: 'Album', path: '/favorite/albums', title: 'Альбомы' },
  { icon: 'Artist', path: '/favorite/artists', title: 'Артисты' },
  { icon: 'Folder', path: '/folders', title: 'Папки' },
]

export type ArtistTab = 'home' | 'single' | 'album' | 'related'
