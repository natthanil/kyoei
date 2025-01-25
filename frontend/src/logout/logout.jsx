import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
export default function logout() {
    const removeCookie = ()=>{
        Cookies.remove('fullname');
        Cookies.remove('id');
        location.href = '/'
    }
    useEffect(()=>{
        removeCookie()
    },[])
  return (
    <div></div>
  )
}
