// src/screens/login/Login.jsx
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React from 'react';
import {Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const handleLoginGoogle = (e) => {
    e.preventDefault()
      const auth = getAuth()
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
         localStorage.setItem("user", JSON.stringify(result.user))
         console.log(result.user);
        navigate('/dashboard')  
        })
        .catch((err) => {
          console.error(err);
        });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate('/dashboard');
      })  
      .catch((err) => {
        console.error(err);
      });
  };
  
  
  return (
    <main className='w-screen min-h-screen flex bg-gradient-to-br from-slate-600 mx-auto p-10 sm:items-center sm:justify-center md:justify-center lg:items-center lg:justify-center overflow-hidden'>
      <form className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-10 mx-auto' autoComplete='off' onSubmit={handleLogin}>
        <h1 className='text-center text-3xl sm:text-4xl font-semibold'>Login</h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input className='h-10 px-3 border border-gray-500 rounded-xl' type="email" name="email" id="email" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password</label>
          <input className='h-10 px-3 border border-gray-500 rounded-xl' type="password" name="password" id="password" />
        </div>
        <div className='flex mt-7 flex-col gap-2'>
          <button className='h-10 w-full bg-blue-500 text-white rounded-lg font-semibold' >
            Login
          </button>
          <button className='h-10 w-full bg-orange-600 text-white rounded-lg font-semibold' onClick={handleLoginGoogle}>
            Login with Google
          </button>
          <hr className='mt-5' />
          <div className="mt-5 rounded-lg font-semibold flex justify-center items-center">
            <span className='text-slate-400' style={{ cursor: 'default' }}>Don't have an account?</span>
            <Link to="/register" className='ml-5 text-blue-500'>Register</Link>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;


// export default Login

// const LoginPage = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
//         {/* Left Section */}
//         <div className="md:w-1/2 p-8 flex flex-col items-center justify-center bg-blue-500 text-white">
//           <img src={illustration} alt="Illustration" className="w-3/4 mb-4" />
//           <h2 className="text-2xl font-bold mb-2 text-center">New Scheduling And Routing Options</h2>
//           <p className="text-center">We also updated the format of podcasts and rewards.</p>
//         </div>

//         {/* Right Section */}
//         <div className="md:w-1/2 p-8 flex flex-col justify-center">
//           <div className="flex flex-col items-center mb-8">
//             <img src="https://via.placeholder.com/50" alt="Logo" className="mb-4" />
//             <h1 className="text-2xl font-bold mb-2">Hello Again!</h1>
//             <p className="text-center text-gray-600">Aliquam consectetur et tincidunt praesent enim massa pellentesque velit odio neque</p>
//           </div>
//           <form className="flex flex-col gap-4">
//             <div>
//               <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full border border-gray-300 p-2 rounded-md"
//                 placeholder="Email"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full border border-gray-300 p-2 rounded-md"
//                 placeholder="Password"
//               />
//             </div>
//             <div className="flex items-center justify-between mb-4">
//               <label className="flex items-center text-gray-600">
//                 <input type="checkbox" className="mr-2" />
//                 Remember Me
//               </label>
//               <a href="#" className="text-blue-500">Recovery Password</a>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
//             >
//               Login
//             </button>
//             <button
//               type="button"
//               className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 p-2 rounded-md mt-2 hover:bg-gray-100 transition"
//             >
//               <img src="https://via.placeholder.com/20" alt="Google Icon" className="mr-2" />
//               Sign in with Google
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default LoginPage;
