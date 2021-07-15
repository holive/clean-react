import React, { useState } from 'react'
import Styles from './signup-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contex'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    emailError: 'Campo obrigatório',
    nameError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu email' />
          <Input type='password' name='password' placeholder='Digite a senha' />
          <Input
            type='password'
            name='passwordConfirmation'
            placeholder='Repita sua senha'
          />

          <button
            data-testid='submit'
            disabled
            className={Styles.submit}
            type='submit'
          >
            Entrar
          </button>

          <span className={Styles.link}>Voltar para o login</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Signup
