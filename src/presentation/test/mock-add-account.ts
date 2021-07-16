import {
  AddAccount,
  AddAccountParams,
  AuthenticationParams
} from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AuthenticationParams

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    return this.account
  }
}
