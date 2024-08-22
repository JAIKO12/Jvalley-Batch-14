import React from 'react'
import { Alert } from 'antd'
const AlertMessage = ({message,type,onclose}) => {
  return (
      <Alert
      message= {message}
      type={type}
      closable
      onClose={onclose}
      className='absolute z-40 top-0'
      />
  )
}

export default AlertMessage