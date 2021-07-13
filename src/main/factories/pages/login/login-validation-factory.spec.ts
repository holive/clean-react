import { makeLoginValidation } from '@/presentation/pages/login/login-validation-factory'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('', () => {
  test('Should make ValidationComposite with correct validations ', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})
