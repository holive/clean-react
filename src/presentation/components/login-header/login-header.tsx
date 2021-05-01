import React, { memo } from 'react'
import Logo from '../logo/logo'
import Styles from './login-header-styles.scss'

const HeaderLogin: React.FC = () => (
  <header className={Styles.header}>
    <Logo />
    <h1>4Dev Enquetes para programadores</h1>
  </header>
)

export default memo(HeaderLogin)
