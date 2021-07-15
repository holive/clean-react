import { render, RenderResult } from '@testing-library/react'

import React from 'react'
import { Signup } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Signup />)

  return {
    sut
  }
}

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  expect((sut.getByTestId(fieldName) as HTMLButtonElement).disabled).toBe(
    isDisabled
  )
}

const testStatusForField = (
  sut: RenderResult,
  field: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${field}-status`)
  expect(fieldStatus.title).toBe(validationError || "It's good!")
  expect(fieldStatus.textContent).toBe(validationError ? '♼' : 'ok')
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'

    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
