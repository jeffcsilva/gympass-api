import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoyQuerySchema.parse(request.query)

  const fetchUserCheckInService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckInService.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
