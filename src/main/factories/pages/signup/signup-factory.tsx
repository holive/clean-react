import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
