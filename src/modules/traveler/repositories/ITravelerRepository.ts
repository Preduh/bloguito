import { HttpRequest } from '../../protocol/http'

export interface TravelerSave {
  id: string
  username: string
  email: string
  password: string
}

export interface ITravelerRepositiry {
  save: (data: HttpRequest) => Promise<TravelerSave>
  findByUsername: (username: string) => Promise<TravelerSave | null>
  findByEmail: (email: string) => Promise<TravelerSave | null>
}
