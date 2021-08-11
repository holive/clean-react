import { Authentication } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: Authentication.Params
  callsCount = 0

  async auth(params: Authentication.Params): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
