import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { SaveSurveyResult } from '@/domain/usecases'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  )
}
