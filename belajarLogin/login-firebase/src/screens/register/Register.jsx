import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Register = () => {
  const navigate = useNavigate();

  const handleLoginGoogle = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    console.log(email, password, password2);

    // simple validation
    if (!email || !password || !password2) {
      return alert("Please fill in all the data");
    }

    if (password !== password2) {
      return alert("Passwords do not match");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters long");
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate('/');
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <main className='w-screen min-h-screen flex bg-gradient-to-br from-slate-600 mx-auto p-10 sm:items-center sm:justify-center md:justify-center lg:items-center lg:justify-center'>
      <form className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-10 mx-auto' autoComplete='off' onSubmit={handleRegister}>
        <h1 className='text-center text-3xl sm:text-4xl font-semibold'>Register</h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input className='h-10 px-3 border border-gray-500 rounded-xl' type="email" name="email" id="email" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className='mt-5'>Password</label>
          <input className='h-10 px-3 border border-gray-500 rounded-xl' type="password" name="password" id="password" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password2" className='mt-5'>Repeat password</label>
          <input className='h-10 px-3 border border-gray-500 rounded-xl' type="password" name="password2" id="password2" />
        </div>
        <div className='flex mt-7 flex-col gap-2'>
          <button className='h-10 w-full bg-blue-500 text-white rounded-lg font-semibold' type='submit'>
            Register
          </button>
          <button className='h-10 w-full bg-orange-600 text-white rounded-lg font-semibold' onClick={handleLoginGoogle}>
            Login with Google
          </button>
          <hr className='mt-5' />
          <div className="mt-2 rounded-lg font-semibold flex justify-center items-center">
            <span className='text-slate-400' style={{ cursor: 'default' }}>Do you have an account?</span>
            <Link to="/" className='ml-5 text-blue-500'>Login</Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Register;
