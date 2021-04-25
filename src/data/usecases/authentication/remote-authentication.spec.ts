import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { HttpPostClientSpy } from '@/data/test'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/usecases/models'
import { mockAccountModel, mockAuthentication } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (
  url: string = faker.internet.url(),
  expectedHttpClientResponse?: HttpResponse<AccountModel>
): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >(expectedHttpClientResponse)
  return {
    sut: new RemoteAuthentication(url, httpPostClientSpy),
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with the correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authParams = mockAuthentication()
    await sut.auth(authParams)
    expect(httpPostClientSpy.body).toBe(authParams)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient is 401', async () => {
    const { sut } = makeSut(null, { statusCode: HttpStatusCode.unauthorized })
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpPostClient is 400', async () => {
    const { sut } = makeSut(null, { statusCode: HttpStatusCode.badRequest })
    await expect(sut.auth(mockAuthentication())).rejects.toThrow(
      new UnexpectedError()
    )
  })

  test('Should throw UnexpectedError if HttpPostClient is 500', async () => {
    const { sut } = makeSut(null, { statusCode: HttpStatusCode.serverError })
    await expect(sut.auth(mockAuthentication())).rejects.toThrow(
      new UnexpectedError()
    )
  })

  test('Should throw UnexpectedError if HttpPostClient is 404', async () => {
    const { sut } = makeSut(null, { statusCode: HttpStatusCode.notFound })
    await expect(sut.auth(mockAuthentication())).rejects.toThrow(
      new UnexpectedError()
    )
  })

  test('Should return and AccountModel if HttpPostClient returns 200', async () => {
    const httpResult = mockAccountModel()
    const { sut } = makeSut(null, {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    })

    const account = await sut.auth(mockAuthentication())
    await expect(account).toEqual(httpResult)
  })
})
