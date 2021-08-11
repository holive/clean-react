import { AddAccount } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccount.Params
  callsCount = 0

  async add(params: AddAccount.Params): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
