import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamSchema.parse(request.params)

  const createCheckInService = makeValidateCheckInService()

  await createCheckInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
