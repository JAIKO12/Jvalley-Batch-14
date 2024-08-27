import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import supabase from '../connector';
import AlertMessage from '../components/Alert';

const Login = () => {
  const [errLogin,setErrLogin] = useState(false)
  const[loading,setLoading] = useState(false)
  function handleSubmit(e) {
    setLoading(true)
    let { username, password } = e;
    supabase.auth.signInWithPassword({
      email: username,
      password: password,
    }).then(res => {
      console.log(res);
      setLoading(false)
      if (res.error) {
   setErrLogin(true)
        return
      }
    });
  }
  return (
    <div 
      className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500'
    >
      {
        errLogin && (
          <AlertMessage message={"Username atau password yang anda masukan salah"} type={'warning'}  onClose={()=>{setErrLogin(false)}}/>
        )
      }
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-sm mx-4'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Login</h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="on"
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

          <Form.Item className='flex justify-center mt-10'>
            <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
              Submit
            </Button>
          </Form.Item>
          <NavLink to={"/register"} className=' text-blue-500 relative left-9'>Don't Have Account? SignUp Here</NavLink>
        </Form>
      </div>
    </div>
  );
};

export default Login;
