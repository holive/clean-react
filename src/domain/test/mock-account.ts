import * as faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/usecases/models'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
