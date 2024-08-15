import React from 'react'
import { Button } from 'antd'
import Login from './login/Login'
import { Route, Routes} from 'react-router-dom'
const App = () => {
  return (
   <div className=''>
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
   </div>

  )
}

export default App