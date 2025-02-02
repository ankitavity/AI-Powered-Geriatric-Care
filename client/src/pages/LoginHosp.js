import React from 'react'
import axios from 'axios'
import {Form,Input} from 'antd'
import { useNavigate } from 'react-router-dom'

const LoginHosp = () => {
  const navigate=useNavigate()
  const submitHandler=async(val)=>{
    try{
        const resp=await axios.post("http://192.168.38.220:8000/api/v1/hosp/login",val)
        if(resp.data.success)
        {
          alert(resp.data.message)
          console.log(resp.data)
          const myObject = {
            _id:resp.data.data._id,
            email:resp.data.data.email,
            hospitalName:resp.data.data.HospName,
            hospitalPhone: resp.data.data.HospPhone,
            hospitalAddress: resp.data.data.HospAddress
          }
          window.localStorage.setItem('hospitalDetails', JSON.stringify(myObject));
          navigate("/hosp_details")
        }
        else
        alert(resp.data.message)
    } 
    catch(error)
    {
      alert(error)
    }
  }
  return (
    <div className='outer-box'>
    <div className='form-box'>
    <Form layout='vertical' onFinish={submitHandler}>
        <h1>Login Hospital</h1>
        <Form.Item label="Email" name="email">
          <Input type="email"/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password"/>
        </Form.Item>
        <button className="btn btn-primary">
          Login 
        </button>
      </Form>
    </div>
    </div>
  )
}

export default LoginHosp