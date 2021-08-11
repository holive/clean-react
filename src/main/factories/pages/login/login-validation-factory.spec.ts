import { makeLoginValidation } from '@/presentation/pages/login/login-validation-factory'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

describe('', () => {
  test('Should make ValidationComposite with correct validations ', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      new ValidationComposite([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5)
      ])
    )
  })
})
