import React, { memo, useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-contex'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)

  return (
    <button
      data-testid='submit'
      disabled={state.isFormInvalid}
      className={Styles.submit}
      type='submit'
    >
      {text}
    </button>
  )
}

export default memo(SubmitButton)
