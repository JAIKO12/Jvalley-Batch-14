import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import supabase from '../connector'

const ModalForm = ({isOpen, isCancel, isRefresh}) => {
  function handleSubmit(e) {
    supabase.from("mahasiswa").insert(e).then(res=>{
      console.info(res)
      isCancel()
      isRefresh()
      alert("Data berhasil ditambahkan")
    })
    
  }
  return (
    <div>
        <Modal open={isOpen} footer={false} onCancel={isCancel} >
          <h1 className='text-center text-2xl font-bold font-sans mb-5'>Form Mahasiswa</h1>
        <Form layout='vertical'
        className='mt-2 grid grid-cols-2 gap-4'
        onFinish={handleSubmit}
        >
          <Form.Item
          label="Nama Mahasiswa"
          name="nama"
          rules={[
            {
              required: true,
              message: 'Masukan Nama anda',
              type: 'string',

            },
          ]}
          >
            <Input autoComplete='off'/>
          </Form.Item>

          <Form.Item
          label="NIM"
          name="nim"
          rules={[
            {
              required: true,
              message: 'Masukan NIM anda dengan benar',
              type: 'string',

            },
          ]}
          >
            <Input autoComplete='off'/>
          </Form.Item>

          <Form.Item
          label="Alamat"
          name="alamat"
          rules={[
            {
              required: true,
              message: 'Masukan Alamat anda',
              type: 'string',

            },
          ]}
          >

            <Input autoComplete='off'/>
          </Form.Item>

          <Form.Item
          label="Telepon"
          name="telepon"
          rules={[
            {
              required: true,
              message: 'Masukan Nomor  anda',
              type: 'string',

            },
          ]}
          >
            <Input autoComplete='off'/>
          </Form.Item>
          <Button type='primary' className=' relative left-24 rounded-xl' htmlType='submit'>
            Tambah Data
          </Button>
        </Form>
        </Modal>
    </div>
  )
}

export default ModalForm