import { Menu } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineAudit, AiOutlineDashboard, AiOutlineMenu, AiOutlineSetting, AiOutlineClose } from "react-icons/ai"

const Layout = () => {
    const navigate = useNavigate()
    const location = useLocation()
   const [collapsed, setCollapsed] = useState(false)
    
    const items =[
        {
            icon: collapsed ? <AiOutlineMenu /> : <AiOutlineClose className='text-center'/>,
            onClick : ()=>{
                setCollapsed(prev=>prev=!prev)
            }
        },

        {
            key : '/',
            label : "Dashboard",
            icon:<AiOutlineDashboard/>,
            onClick: ()=>{
                navigate("/")
            }
        },
        {
            key : '/mahasiswa',
            label : 'Data Mahasiswa',
            icon:<AiOutlineAudit/>,
            onClick: ()=>{
                navigate("/mahasiswa")
            }
        },
        {
            key : '/settings',
            label : 'Settings',
            icon:<AiOutlineSetting/>,
            onClick: ()=>{
                navigate("/settings")
            }
        }
    ]
    return (
    <main className='flex relative'>
        {/* sidebar */}
        <div className='w-[200px] h-auto fixed'>
        <Menu 
        defaultSelectedKeys={[location.pathname]}
        mode='inline'
        items={items}
        className='h-screen'
        theme='dark'
        inlineCollapsed= {collapsed}
        />
        </div>

        {/* right content */}
        <div className={`flex-1 h-[2000px] transition-all  duration-[350ms] ${collapsed ? 'ml-[100px]' : 'ml-[210px]'}`} >
        <Outlet/>
        </div>
        
    </main>
  )
}

export default Layout