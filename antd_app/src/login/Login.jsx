// import React, { useState } from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// import { NavLink } from 'react-router-dom';
// import supabase from '../connector';

// const Login = () => {
//   const[loading, setLoading] = useState(false)
//   function handleSubmit(e) {
//     setLoading(true)
//   let {username, password} = e
//    supabase.auth.signInWithPassword({
//     email:username,
//     password:password
//    }).then(res=>{
//     console.log(res);
//     setLoading(false)
//    }) 
    
//   }
//   return (
//     <section className="h-screen flex items-center">
//     <div className="container mx-auto">
//       <div className="flex flex-wrap">
//         <div className="w-full sm:w-1/2 text-black flex items-center justify-center">
//           <div className="px-5">
//             <div className="flex items-center mb-5">
//               <i className="fas fa-crow fa-2x me-3 pt-5" style={{ color: '#709085' }}></i>
//               <span className="text-4xl font-bold">Logo</span>
//             </div>

//             <div className="h-full flex items-center justify-center">
//               <Form
//                 style={{ width: '23rem' }}
//                 layout="vertical"
//                 onFinish={handleSubmit}
//               >
//                 <h3 className="text-2xl font-normal mb-6" style={{ letterSpacing: '1px' }}>Log in</h3>

//                 <Form.Item
//                   label="Email address"
//                   name="username"
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Please input your Email!',
//                       type: 'email',
//                     },
//                   ]}
//                 >
//                   <Input
//                     placeholder="Enter your email"
//                     className="py-2 px-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   label="Password"
//                   name="password"
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Please input your password!',
//                     },
//                   ]}
//                 >
//                   <Input.Password
//                     placeholder="Enter your password"
//                     className="py-2 px-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </Form.Item>

//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     className="btn btn-info w-full"
//                     disabled={loading}
//                     loading={loading}
//                   >
//                     Login
//                   </Button>
//                 </Form.Item>

//                 <p className="small mb-5">
//                   <NavLink to={"/forgot-password"} className="text-muted">
//                     Forgot password?
//                   </NavLink>
//                 </p>

//                 <p>
//                   Don't have an account?{' '}
//                   <NavLink to={"/register"} className="text-blue-500">
//                     Register here
//                   </NavLink>
//                 </p>
//               </Form>
//             </div>
//           </div>
//         </div>

//         <div className="w-full sm:w-1/2 hidden sm:block">
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
//             alt="Login image"
//             className="w-full h-full object-cover object-left"
//           />
//         </div>
//       </div>
//     </div>
//   </section>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import supabase from '../connector';
import AlertMessage from '../components/Alert';
import warning from 'antd/es/_util/warning';

const Login = () => {
  const [errPas,setErrPas] = useState(false)
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
   setErrPas(true)
        return
      }
    });
  }

  return (
    <div 
      className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500'
    >
      {
        errPas && (
          <AlertMessage message={"Username atau password yang anda masukan salah"} type={'warning'}  onClose={()=>{setErrPas(false)}}/>
        )
      }
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-sm mx-4'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Login</h2>
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
