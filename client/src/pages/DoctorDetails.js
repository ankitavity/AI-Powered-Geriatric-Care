import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'

const DoctorDetails =  () => {
  const navigate=useNavigate()
  const doctor = JSON.parse(window.localStorage.getItem('doctorDetails'))
  const [pat, setPat] = useState(null)
  
  // console.log(doctor)
  const getPatientDetails = async () => {
    try {
      const resp = await axios.post(
        "http://192.168.38.220:8000/api/v1/dr/get_pat_details",
        { email: doctor.email }
      );
      console.log(resp.data);
      //backend we are sending 2 of the message from controller success, data hence to retrieve data resp.data.data
      setPat(resp.data.data)

    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    // console.log("Hi")
    getPatientDetails()

  }, [])

 const columns=[
  {
    title:"Patient name",
    dataIndex:"pName"
  },
  {
    title:"Guardian Name",
    dataIndex:"guardianName"
  },
  {
    title:"Guardian Phone",
    dataIndex:"guardianPhone"
  },
  {
   title:"Guardian Email",
   dataIndex:"email"
  },
  {
    title:"Refer to",
    render:(text,record)=>
    <div className='pointerDiv' onClick={()=> navigate("/pat_details",{state:{redirectFrom:"doctor",id:record._id}})}>
      Click Here
    </div>
  }
 ]
  //console.log(pat)
  return (
    <>
    <div className='welcomeBox'>
      Hi {doctor.drName}
    </div>
    <br/>
    <div className='w-75 mx-auto'>
      <div>Patient List</div>
      <Table columns={columns} dataSource={pat}/>
    </div>
    </>
  )
}

export default DoctorDetails