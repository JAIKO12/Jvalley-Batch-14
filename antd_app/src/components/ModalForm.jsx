import { Modal } from 'antd'
import React from 'react'

const ModalForm = ({isOpen, isCancel}) => {
  return (
    <div>
        <Modal open={isOpen} footer={false} onCancel={isCancel}>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, voluptas vel. Dolore, commodi eligendi nisi incidunt, vero numquam modi dignissimos, aliquam repellendus doloremque ullam. Quasi illum deleniti commodi nisi rerum.</p>
        </Modal>
    </div>
  )
}

export default ModalForm