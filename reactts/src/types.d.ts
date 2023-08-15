export interface Sub {
  nick: string,
  subMonths: number,
  avatar: string,
  description?: string
}

export type SubsResponseFromApi = Array<{
  nick: string,
  subMonths: string,
  profileUrl: string,
  description: string
}>
