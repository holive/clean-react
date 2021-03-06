import {
  ValidationBuilder as Builder,
  ValidationComposite
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation')
      .required()
      .min(5)
      .sameAs('password')
      .build()
  ])
}
