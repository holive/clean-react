import * as faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

describe('LocalStorageAdapter', () => {
  test('Should call localStorage with correct values', async () => {
    const key = faker.database.column()
    const value = faker.random.word()
    await new LocalStorageAdapter().set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
