import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'

const HospDetail = () => {
  const navigate=useNavigate()
  const [pat, setPat] = useState(null)
  const hospital = JSON.parse(window.localStorage.getItem('hospitalDetails'));
  // console.log(hospital)
  const getPatientDetails = async () => {
    try {
      const resp = await axios.post("http://192.168.38.220:8000/api/v1/hosp/get_pat_details", { email: hospital.email })
      console.log(resp.data);
      //backend we are sending 2 of the message from controller success, data hence to retrieve data resp.data.data
      setPat(resp.data.data)

    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
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
      <div className='pointerDiv' onClick={()=> navigate("/pat_details",{state:{redirectFrom:"hospital",id:record._id}})}>
        Click here
      </div>
    }
   ]
  
  console.log(hospital);
  return (
    <>
    <div className='welcomeBox'>
      Hi {hospital.hospitalName}
    </div>
    <br/>
    <div className='w-75 mx-auto'>
      <div>Patient List</div>
      <Table columns={columns} dataSource={pat}/>
    </div>

    </>
  )
}

export default HospDetail