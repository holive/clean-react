import {
  HttpPostClient,
  HttpPostParams
} from '@/data/protocols/http/http-post-client'
import {
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  constructor(
    public response: HttpResponse = {
      statusCode: HttpStatusCode.ok
    }
  ) {}

  url?: string
  body?: object

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}
