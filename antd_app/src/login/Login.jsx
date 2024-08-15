import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {
  return (
    <div 
      className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500'
    >
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Login</h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="vertical"
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item className='flex justify-center mt-10'>
            <Button type="primary" htmlType="submit" className='w-full'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
