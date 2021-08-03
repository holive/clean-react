import { HttpPostParams, HttpPostClient } from '@/data/protocols/http'
import faker from 'faker'

import {
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http/http-response'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  constructor(
    public response: HttpResponse<R> = {
      statusCode: HttpStatusCode.ok
    }
  ) {}

  url?: string
  body?: any

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}
