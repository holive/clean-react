import * as faker from 'faker'
import { Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})
