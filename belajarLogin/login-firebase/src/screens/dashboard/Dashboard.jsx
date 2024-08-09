import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  // membuat navigate
  const navigate = useNavigate()

  // membuat state
  const [user,setUser] = useState()

  // useEffect
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
    
  }, [])

  console.log(user);

  // handle logoout
  const handleLogout = ()=>{
    const auth = getAuth();
    signOut(auth).then((result)=>{
      localStorage.clear(result)
      navigate("/")
    }).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-slate-400 to-slate-300 lg:items-center lg:justify-center'>

      <div className='w-full mt-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md bg-white flex flex-col gap-4 shadow-lg rounded-lg p-10 mx-auto items-center'>
        <h1 className='text-2xl text-slate-700 font-semibold'>Welcome {user?.displayName}</h1>
        <img src={user?.photoURL} alt="profile" className='w-[100px] h-[100px] rounded-full object-cover' />
        <h2 className=''>{user?.email}</h2>
        <button className='h-10 bg-red-600 rounded-lg text-white w-full ' onClick={handleLogout}>Logout</button>
      </div>

    </main>
  )
}

export default Dashboard