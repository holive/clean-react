import { HttpPostClientSpy } from '@/data/test'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'
import { HttpResponse } from '@/data/protocols/http'
import { mockAddAccountParams } from '@/domain/test'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (
  url: string = faker.internet.url(),
  expectedHttpClientResponse?: HttpResponse<AccountModel>
): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >(expectedHttpClientResponse)

  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
