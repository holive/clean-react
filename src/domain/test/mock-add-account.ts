import * as faker from 'faker'
import { AddAccountParams } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    email: faker.internet.email(),
    password,
    name: faker.random.word(),
    passwordConfirmation: password
  }
}
