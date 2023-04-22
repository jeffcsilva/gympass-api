import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoudError } from './errors/resource-not-found-error'

interface GetUserProfileServiceRequest {
  userId: string
}

interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoudError()
    }

    return {
      user,
    }
  }
}
