import { ArtistTab } from "../interfaces/app.interface"

export const volumeMultiplier = 0.3
export const artistTabs: { value: ArtistTab, title: string }[] = [
  { title: 'Главная', value: 'home' },
  { title: 'Альбомы', value: 'album' },
  { title: 'Синглы и EP', value: 'single' },
  { title: 'Схоже с творчеством', value: 'related' }
]
