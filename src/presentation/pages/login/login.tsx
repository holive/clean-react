import React, { useState } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contex'

const Login: React.FC = () => {
  const [state] = useState({ isLoading: false })
  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='Digite seu email' />
          <Input type='password' name='password' placeholder='Digite a senha' />

          <button
            data-testid='submit'
            disabled
            className={Styles.submit}
            type='submit'
          >
            Enviar
          </button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
