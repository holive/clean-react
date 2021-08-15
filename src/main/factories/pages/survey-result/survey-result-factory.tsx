import { SurveyResult } from '@/presentation/pages'
import { useParams } from 'react-router-dom'
import React from 'react'
import {
  makeRemoteLoadSurveyResult,
  makeRemoteSaveSurveyResult
} from '@/main/factories/usecases'

export const makeSurveyResult: React.FC = () => {
  // @ts-expect-error
  const { id } = useParams()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
