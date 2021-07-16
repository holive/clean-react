import { fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  expect((sut.getByTestId(fieldName) as HTMLButtonElement).disabled).toBe(
    isDisabled
  )
}

export const testStatusForField = (
  sut: RenderResult,
  field: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${field}-status`)
  expect(fieldStatus.title).toBe(validationError || "It's good!")
  expect(fieldStatus.textContent).toBe(validationError ? '♼' : 'ok')
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, {
    target: { value }
  })
}

export const testElementExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}
