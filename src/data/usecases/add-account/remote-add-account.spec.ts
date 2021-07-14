import { HttpPostClientSpy } from '@/data/test'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { mockAddAccountParams } from '@/domain/test'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

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

  test('Should call HttpPostClient with the correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toBe(addAccountParams)
  })

  test('Should throw EmailInUseError if HttpPostClient is 403', async () => {
    const { sut } = makeSut(null, { statusCode: HttpStatusCode.forbidden })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpPostClient is 400', async () => {
    const { sut } = makeSut(null, { statusCode: HttpStatusCode.badRequest })
    await expect(sut.add(mockAddAccountParams())).rejects.toThrow(
      new UnexpectedError()
    )
  })
})
