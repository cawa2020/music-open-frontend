export interface Contributor {
  id: number
  name: string
  link: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  radio: boolean
  tracklist: string
  type: string
  role: string
}

export interface Artist {
  nb_fan: number
  nb_album: number
  id: number
  record_type: 'album' | 'ep' | 'single'
  name: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  tracklist: string
  type: 'artist'
}


export interface ArtistBrief {
  id: number
  name: string
  tracklist: string
  type: string
}
