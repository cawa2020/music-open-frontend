import { ArtistTab } from "../interfaces/app.interface"

export const volumeMultiplier = 0.3
export const artistTabs: { value: ArtistTab, title: string }[] = [
  { title: 'Главная', value: 'home' },
  { title: 'Альбомы', value: 'album' },
  { title: 'Синглы и EP', value: 'single' },
  { title: 'Схоже с творчеством', value: 'related' }
]

// export const LOCAL_API_ENDPOINT = 'https://improved-eureka-p65q6jjjjgv2997w-3000.app.github.dev/'
export const LOCAL_API_ENDPOINT = 'localhost:3000/'