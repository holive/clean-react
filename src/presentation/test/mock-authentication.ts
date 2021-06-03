import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/usecases/models'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCount = 0

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return this.account
  }
}