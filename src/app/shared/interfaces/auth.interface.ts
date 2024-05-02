export interface Login {
  username: string
  password: string
}

export interface Registration extends Login {
  email: string
}

export interface Error {
  statusCode: number
}

export interface Token {
  access_token: string
}
