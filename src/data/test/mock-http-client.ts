import {
  HttpPostClient,
  HttpPostParams
} from '@/data/protocols/http/http-post-client'
import {
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http/http-response'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  constructor(
    public response: HttpResponse<R> = {
      statusCode: HttpStatusCode.ok
    }
  ) {}

  url?: string
  body?: T

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}
