import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col'>
        <h1 className='text-4xl font-bold text-red-500'>Page Not Found</h1>
        <span className='text-4xl animate-spin'>  🤣</span>
        <NavLink to={-1}>
        <button className="px-6 py-2 mt-5 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
        Back
        </button>
        </NavLink>
    </div>
  )
}

export default PageNotFound