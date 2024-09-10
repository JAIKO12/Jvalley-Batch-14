import { useQuery } from '@tanstack/react-query'
import { Menu } from 'antd'
import React, { Children } from 'react'
import supabase from '../connector'

const MenuComponent = () => {

    const {data,isError } = useQuery({
        queryKey : ['read_account'],
        queryFn : async()=>{
            const response = supabase.auth.getUser()
            console.log(response.email);
            return response
        }
    })
    const items = [
        {
            label: 'Email',
            key: 'account',
            children:[
                {
                    label: 'Profile',  
                    key: 'profile'
                },
             
            ]
        }
    ]
  return (
   <Menu mode='horizontal' items={items}/>
  )
}

export default MenuComponent
