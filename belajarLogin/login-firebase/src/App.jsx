import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './screens/login/Login'
import Register from './screens/register/Register'
import Dashboard from './screens/dashboard/Dashboard'
import "./firebase"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import PageNotFound from './screens/page-not-found/PageNotFound'

// const App = () => {
//   // state
//   const [isLogin, setIsLogin] = useState(false)
//   const [loading, setLoading] = useState(true)
  
//   // clc
//   useEffect(()=>{
//     const auth = getAuth()
//     onAuthStateChanged(auth, (result)=>{
//       if(result){
//         setIsLogin(true);
//       setLoading(false)
//       return
//     }
//     setIsLogin(false)
//     setLoading(false)
//     })
//   },[])

//   if(loading){
//     return(
//       <div className='w-screen h-screen bg-gradient-to-tr from-slate-400 to-slate-300 flex justify-center items-center '>
//         <h1 className='text-2xl font-semibold text-white'>Loading...</h1>
//       </div>
//     )
//   }
//   return (
//     <>
//     {isLogin ? (
//       <Routes>
//       {/* <Route path='/' element={<Login/>}/> */}
//       <Route path='/dashboard' element={<Dashboard/>}/>
//       <Route path='*' element={<PageNotFound/>}/>
//     </Routes>
//     ) : (
//       <Routes>
//       <Route path='/' element={<Login/>}/>
//       <Route path='/register' element={<Register/>}/>
//       <Route path='*' element={<PageNotFound/>}/>
//       </Routes>
//     )}
//     </>
//   )
// }

// export default App


const App = () => {
  // state
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // clc
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth, (result)=>{
      if(result){
        setIsLogin(true);
      setLoading(false)
      return
    }
    setIsLogin(false)
    setLoading(false)
    })
  },[])

  if(loading){
    return(
      <div className='w-screen h-screen bg-gradient-to-tr from-slate-400 to-slate-300 flex justify-center items-center '>
        <h1 className='text-2xl font-semibold text-white'>Loading...</h1>
      </div>
    )
  }
  return (
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    
    
  )
}

export default App