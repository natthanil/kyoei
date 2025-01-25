import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'boxicons'
import Cookies from 'js-cookie'
import '../navbar/navbar.css'
export default function navbar() {
  const nav = useNavigate()

  const [cookie, setCookie] = useState('')
  const getCookieFuntion = () => {
    const getCookie = Cookies.get('fullname');
    setCookie(getCookie)
    if(!getCookie){
      nav('/')
    }
  }

  useEffect(() => {
    getCookieFuntion()
  }, [])

  return (
    <div>
      <div className="navbar">
        <div className="nav-container">
          <div className="box-logo">
            <img className='logo' src='src\assets\kyoie.png' alt="" />
          </div>

          <div className="box-check-dispaly">
            <label htmlFor="menu-icon" className='show-menu'><box-icon name='menu'></box-icon></label>
            <input id='menu-icon' className='check-show-menu' type="checkbox" />


            <div className="display-menu">
              <ul className='menu-link'>
                <Link to={'/index'}><li className='link'>Home</li></Link>
                {/* <label htmlFor="menu-list-id"><p ><li className='link'>เมนู <i class='bx bxs-chevron-down link'></i></li></p></label>
                <input id='menu-list-id' className='menu-list' type="checkbox" />
                <div className="box-menu-mini">
                  <Link to={'/'}><li className='link-mini'>ขาดงาน</li></Link>
                  <Link to={'/'}><li className='link-mini'>ลางาน</li></Link>
                  <Link to={'/'}><li className='link-mini'>สาย</li></Link>
                </div> */}
                <Link to={''}><li className='link'>{cookie}</li></Link>
                <Link to={'/logout'}><li className='link'>ออกจากระบบ</li></Link>
                {/* <div className="icon-contact">
                  <Link to={'/'}><li className='link'><box-icon type='logo' name='facebook-square'></box-icon></li></Link>
                  <Link to={'/'}><li className='link'><box-icon type='logo' name='instagram'></box-icon></li></Link>
                  <Link to={'/'}><li className='link'><box-icon name='twitter' type='logo' ></box-icon></li></Link>
                </div> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

