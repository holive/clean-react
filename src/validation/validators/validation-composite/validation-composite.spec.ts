import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}
const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut(faker.database.column())

    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())

    const error = sut.validate('any_field', faker.random.words())
    expect(error).toEqual(error)
  })

  test('Should return error if any validation fails', () => {
    const { sut } = makeSut(faker.database.column())
    const error = sut.validate('any_field', faker.random.words())
    expect(error).toBeFalsy()
  })
})
