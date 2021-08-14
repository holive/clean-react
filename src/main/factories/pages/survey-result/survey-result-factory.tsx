import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'
import { useParams } from 'react-router-dom'
import React from 'react'

export const makeSurveyResult: React.FC = () => {
  // @ts-expect-error
  const { id } = useParams()
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
}
