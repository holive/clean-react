import React from 'react'
import ReactDom from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/globals'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'

ReactDom.render(
  <Router makeLogin={makeLogin} makeSignup={makeSignup} />,
  document.getElementById('main')
)
