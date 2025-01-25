import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/navbar'
import './staff.css'
import axios from 'axios';
import cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function staff() {
    axios.defaults.baseURL = 'http://localhost:4000'
    const [cookie, setCookie] = useState('')
    const date = new Date().getTime()
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [dateDifference, setDateDifference] = useState('');
    const calculateDateDifference = () => {
        const start = new Date(formData.dateStart);
        const end = new Date(formData.dateEnd);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            setDateDifference('Invalid Date');
            return;
        }

        // คำนวณระยะห่างระหว่างวันที่ (จำนวนมิลลิวินาที)
        const differenceInTime = end.getTime() - start.getTime();
        
        // แปลงเป็นจำนวนวัน
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        setDateDifference(differenceInDays);

        
    };
    const [d ,setD] = useState({})
    const [formData, setFormData] = useState({ name: '', cause: '', select: 'ลางาน', dateStart: '', dateEnd: '',  time: time })
    const locationNav = useNavigate()
    const cookieStaff = () => {
        const getCookie = cookies.get('fullname')
        setCookie(getCookie)
    }
    // setD(dateDifference)
    const handleSubmit = (e) => {
        e.preventDefault();
        calculateDateDifference()
        console.log(formData)
        axios.post('/leave', formData)
            .then((res) => {
                Swal.fire({
                    title: res.data.message,
                    text: res.data.text,
                    icon: res.data.status,
                    confirmButtonText: 'OK',
                });
            })
        locationNav('/index')
    };
    const username = formData.name = cookie

    const head = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data, [name]: value
        }))

    }

    

    useEffect(() => {
        cookieStaff()
        console.log(formData)
        // calculateDateDifference()
        console.log(d)
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
          }, 1000); // อัปเดตทุกๆ 1000 มิลลิวินาที (ทุกๆ 1 วินาที)
      
          // เคลียร์ตัว interval เมื่อคอมโพเนนต์ถูกทำลาย
          return () => clearInterval(intervalId);
        
    }, [])

    return (
        <div>
            <Navbar />
            <div className="box-staff">
                <div className="text-title">
                    <div className="form-container">
                        <h2>แจ้งการลา</h2>
                        <form onSubmit={handleSubmit} className="custom-form">
                            <div className="input-group">
                                <label htmlFor="name">ชื่อ</label>
                              
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={head}
                                    value={username}
                                    placeholder="กรุณากรอกชื่อ"
                                    required
                                    disabled
                                />

                            </div>
                            <div className="input-group">
                                <label htmlFor="select">เลือดการ ขาด ลา มาสาย</label>
                                <select name="select" onChange={head} required id="select" className='select'>
                                    <option value="ลางาน">ลางาน</option>
                                    <option value="เข้าสาย">เข้าสาย</option>
                                    <option value="ขาดงาน">ขาดงาน</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label htmlFor="cause">สาเหตุ</label>
                                <input
                                    type="text"
                                    id="cause"
                                    name="cause"
                                    onChange={head}
                                    placeholder="กรุณากรอกสาเหตุ"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>วันที่เริ่มต้น วันที่ลา: </label>
                                <input type="date" name='dateStart' required onChange={head} />
                            </div>
                            <div className="input-group">
                                <label>วันที่สิ้นสุด วันที่สามารถมาทำงาน: </label>
                                <input type="date" name='dateEnd' onChange={head} />
                            </div>
                           
                           
                         
                            <button type="submit" className="submit-btn">ส่งข้อมูล</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
