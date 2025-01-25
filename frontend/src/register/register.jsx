import React, { useState } from 'react'
import './register.css'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function login() {
    const locationNav = useNavigate()
    axios.defaults.baseURL = 'http://localhost:4000';
    const [registerForm, setRegisterForm] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        phone: '',
        address: ''
    })

    const dataForm = (e) => {
        const { name, value } = e.target
        setRegisterForm((data) => ({
            ...data, [name]: value
        }))
    }
    const submitForm = (e) => {
        e.preventDefault()
        console.log(registerForm)
        axios.post('/registerUser', registerForm)
            .then((res) => {
                if (res.data.success) {
                    Swal.fire({
                        title: res.data.message,
                        text: res.data.text,
                        icon: res.data.status, // รูปแบบของไอคอน (success, error, warning, info, question)
                        confirmButtonText: 'OK', // ปุ่มสำหรับการยืนยัน
                    });
                    // Cookies.set('username', res.data.username, { expires: 1 / 60 })
                    locationNav('/')


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
    return (
        <div>
            <div className="box-register">
                <form onSubmit={submitForm}>
                    <div className="registers">
                        <div className="register-box">
                            <p className='login-text'>สมัครสมาชิก</p>
                        </div>
                        <div className="box-input-register">
                            <label htmlFor="username" className='label'>ชื่อ - สกุล</label><br />
                            <input type="text" className='input' onChange={dataForm} name="fullname" id="" placeholder='ชื่อ - สกุล' required /><br />
                            <label htmlFor="username" className='label'>อีเมล </label><br />
                            <input type="email" className='input' onChange={dataForm} name="email" placeholder='อีเมล' id="" /> <br />
                            <label htmlFor="username" className='label'>ชื่อผู้ใช้</label><br />
                            <input type="text" className='input' onChange={dataForm} name="username" id="" placeholder='ชื่อผู้ใช้งาน' required /><br />
                            <label htmlFor="username" className='label'>รหัสผ่าน</label><br />
                            <input type="password" className='input' onChange={dataForm} name="password" placeholder='รหัสผ่าน' id="" required /> <br />
                            <label htmlFor="username" className='label'>เบอร์</label><br />
                            <input type="text" className='input' onChange={dataForm} name="phone" id="" placeholder='เบอร์มือถือ' required /><br />
                            <label htmlFor="username" className='label'>ที่อยู่</label><br />
                            <textarea name="address" className='input' onChange={dataForm} placeholder='กรอกที่อยู่' id="" required></textarea>
                        </div>
                        <div className="submit-box">

                            <input type="submit" className="submit" value="สมัครสมาชิก" />
                        </div>

                        <p className='register'>สามารถกลับไปที่หน้าเข้าสู่ระบบ : <Link to={'/'}>กลับไปที่หน้าเข้าสู่ระบบ</Link></p>
                    </div>
                </form>

            </div>
        </div >
    )
}
