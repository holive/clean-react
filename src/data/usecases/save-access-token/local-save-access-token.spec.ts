import faker from 'faker'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SetStorageMock } from '@/data/test/mock-storage'

export type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.uuid()

    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
