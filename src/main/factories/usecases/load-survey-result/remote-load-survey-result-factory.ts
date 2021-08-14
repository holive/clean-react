import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadSurveyResult } from '@/domain/usecases'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  )
}
