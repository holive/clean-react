import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpGetClientDecorator()
  )
}
