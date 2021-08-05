import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contex'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

const Signup: React.FC<Props> = ({
  validation,
  addAccount,
  updateCurrentAccount
}: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    )

    setState({
      ...state,
      emailError,
      nameError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!emailError ||
        !!passwordError ||
        !!nameError ||
        !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({ ...state, isLoading: true })

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await updateCurrentAccount.save(account)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          data-testid='form'
          onSubmit={handleSubmit}
        >
          <h2>Criar conta</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu email' />
          <Input type='password' name='password' placeholder='Digite a senha' />
          <Input
            type='password'
            name='passwordConfirmation'
            placeholder='Repita sua senha'
          />

          <SubmitButton text='Cadastrar' />

          <Link
            data-testid='login-link'
            replace
            to='login'
            className={Styles.link}
          >
            Voltar para o login
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Signup
