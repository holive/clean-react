import React, { useState } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contex'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({ isLoading: false, errorMessage: '' })

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='Digite seu email' />
          <Input type='password' name='password' placeholder='Digite a senha' />

          <button className={Styles.submit} type='submit'>
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
