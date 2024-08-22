import React, { useState } from 'react'
import {Button, Checkbox, Form, Input } from 'antd';
import supabase from '../connector';
import AlertMessage from '../components/Alert';
const Register = () => {
  
  const [errPas, setErrPas] = useState(false)
  const [loading, setLoading]= useState(false)
  const [succReg, setSuccReg] = useState(false)

  function handleSubmit(e) {
    setLoading(true)
    let {username, password,rePassword} = e
    if (password !== rePassword) {
      //  alert("Pasword yang anda masukan salah")
      setErrPas(true)
      setLoading(false)
       return
    }

    supabase.auth.signUp({
      email: username,
      password: password,
    }).then(res=>{
      console.log(res);
      setLoading(false)
      setSuccReg(true)
      
    })
    
  }
  return (
    <div 
    className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500'
  >
    
   {
    errPas && (
  
      <AlertMessage message={"Password yang anda masukan tidak sama"} type={"warning"} onClose={()=>{setErrPas(false)}}/>
    )

    
   }
   {
    succReg && (
      // <Alert
      // message="Register Berhasil"
      // type='success'
      // closable
      // onClose={()=>{
      //   setSuccReg(false)
      // }}
      // className='absolute z-40 top-0'
      // />

      <AlertMessage message={"Register Berhasil"} type={"sucses"} onclose={()=>{
        setSuccReg(false)
      }}/>
    )


   }
    <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-sm mx-4  py-3'>
    
      <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Register</h2>
   
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
              type: 'email',
            },
          ]}
        >
          <Input 
            placeholder="Enter your email"
            className="py-2 px-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
         label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password 
            placeholder="Enter your password"
            className="py-2 px-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
         label="Repassword"
          name="rePassword"
          rules={[
            {
              required: true,
              message: 'Please repeat your password',
            },
          ]}
        >
          <Input.Password 
            placeholder="Enter your password"
            className="py-2 px-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>


        <Form.Item className='flex justify-center mt-10'>
          <Button type="primary" htmlType="submit" className='w-full' disabled={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  )
}

export default Register