import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearby {
  latitude: number
  longitude: number
}

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearBy(params: FindManyNearby): Promise<Gym[]>
  seachMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
