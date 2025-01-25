import React, { useEffect, useState } from 'react'
import './login.css'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function login() {

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const isWithinActiveHours = (
        (currentHour >= 17 && currentMinute >= 30) || // หลัง 17:30
        (currentHour < 24) // ก่อน 9:00
    );

    const locationNav = useNavigate()
    axios.defaults.baseURL = 'http://localhost:4000';
    const [dataForm, setDataForm] = useState({
        username: '',
        password: ''
    })

    const head = (e) => {
        const { name, value } = e.target
        setDataForm((data) => ({
            ...data, [name]: value
        }))
    }



    const headSubmit = (e) => {
        e.preventDefault()
        axios.post('/loginUser', dataForm)
            .then((res) => {
                if (res.data.success) {
                    Swal.fire({
                        title: res.data.message,
                        text: res.data.text,
                        icon: res.data.status, // รูปแบบของไอคอน (success, error, warning, info, question)
                        confirmButtonText: 'OK', // ปุ่มสำหรับการยืนยัน
                    });
                    decodeURIComponent(Cookies.set('fullname', res.data.fullname, { expires: 1 / 60 }))
                    Cookies.set('id', res.data.id, { expires: 1 / 60 })
                    locationNav('/index')


                } else {
                    Swal.fire({
                        title: res.data.message,
                        text: res.data.text,
                        icon: res.data.status, // รูปแบบของไอคอน (success, error, warning, info, question)
                        confirmButtonText: 'OK', // ปุ่มสำหรับการยืนยัน
                    });
                }


            })

    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="box-login">
                {isWithinActiveHours ? (
                    <form onSubmit={headSubmit}>
                        <div className="login">
                            <div className="login-box">
                                <p className='login-text'>เข้าสู่ระบบ</p>
                            </div>
                            <div className="box-input">
                                <label htmlFor="username" className='label'>ชื่อผู้ใช้</label><br />
                                <input type="text" className='input' onChange={head} name="username" id="" placeholder='ชื่อผู้ใช้งาน' /><br />
                                <label htmlFor="username" className='label'>รหัสผ่าน</label><br />
                                <input type="password" className='input' onChange={head} name="password" placeholder='รหัสผ่าน' id="" />
                            </div>
                            <div className="submit-box">

                                <input type="submit" className="submit" value="เข้าสู่ระบบ" />
                            </div>

                            <p className='register'>สามารถลงทะเบียนผู้ใช้งาน : <Link to={'/register'}>ลงทะเบียนผู้ใช้งาน</Link></p>
                        </div>
                    </form>
                ) : (
                    <h1 className='login-text'>เว็บไซต์ KYOEI ไม่สามารถใช้งานได้ในเวลานี้ ต้องรอ 17:30 น.</h1>
                )}


            </div>
        </div >
    )
}
