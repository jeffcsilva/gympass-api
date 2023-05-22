import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gyms-repository'

interface SearchGymsServiceRequest {
  query: string
  page: number
}

interface SearchGymsServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
    const gyms = await this.gymsRepository.seachMany(query, page)

    return {
      gyms,
    }
  }
}
