import React, { useEffect, useState } from 'react'
import './index.css'
import Navbar from '../navbar/navbar'
import { Link } from 'react-router-dom'
import 'boxicons'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function index() {
  axios.defaults.baseURL = 'http://localhost:4000'
  const getCookiefullname = Cookies.get('fullname')
  const [database, setDatabase] = useState({ fullname: getCookiefullname })
  const [getDatafullname, setGetDatafullname] = useState([])
 
  const fullData = () => {
    axios.post('/shopData', database)
      .then((res) => {
        
        setGetDatafullname(res.data.data)
        console.log(getDatafullname)
      })
  }
  let sd = 0;

  useEffect(() => {
   
    fullData()
  }, [])
  return (
    <div>
      <Navbar />
      <div className="container-index">
        <div className="button-box">
          <Link to={'/staff'}><button className='button-add'> <i class='bx bx-plus-medical'></i> แจ้งการ ลา</button></Link>
        </div>
        <div className="table-data">
          <div className="App">
            <h2 className='title-text'>รายการลา</h2>
            <table>
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ชื่อผู้ลา</th>
                  <th>สถานะ</th>
                  <th>เหตุ</th>
                  <th>การอนุมัติ</th>
                </tr>
              </thead>
              <tbody>
                {
                  getDatafullname.map((item) => (
                    <tr>
                      <td>{sd += 1}</td>
                      <td>{item.username}</td>
                      <td>{item.select}</td>
                      <td>{item.cause}</td>
                      <td>{item.approval}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
