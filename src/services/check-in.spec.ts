import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepositoy } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepositoy
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepositoy()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-19.9573063),
      longitude: new Decimal(-44.1902715),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9573063,
      userLongitude: -44.1902715,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 22, 17, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9573063,
      userLongitude: -44.1902715,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -19.9573063,
        userLongitude: -44.1902715,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice BUT in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 22, 17, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9573063,
      userLongitude: -44.1902715,
    })

    vi.setSystemTime(new Date(2023, 3, 23, 17, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9573063,
      userLongitude: -44.1902715,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-19.9183561),
      longitude: new Decimal(-43.9307724),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -19.9573063,
        userLongitude: -44.1902715,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
