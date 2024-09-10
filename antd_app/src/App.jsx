import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './login/Login'
import Register from './login/Register'
import Layout from './screen/Layout'
import supabase from './connector'
import ListMahasiswa from './mahasiswa/ListMahasiswa'
import SpinComponent from './components/Spin'


const App = () => {
  const [session, setSession] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
 
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
  if(!session) {
    return (
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    )
  }

  if (loading) {
    return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-100'>
      <SpinComponent/>
    </div>
    )
  }

  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path='/mahasiswa' element={<ListMahasiswa/>}/>
        <Route path='/settings' element={<h1>Settings</h1>}/>
      </Route>
    </Routes>
  )


}

export default App