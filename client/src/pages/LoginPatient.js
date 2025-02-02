import axios from 'axios';
import React from 'react'
import {Form,Input} from 'antd'
import { useNavigate } from 'react-router-dom';
const LoginPatient = () => {
    const navigate=useNavigate()
    const submitHandler =async (inputs) => {
        try{
            //to prevent auto refresh
            // event.preventDefault()
            const resp=await axios.post('http://192.168.38.220:8000/api/v1/patient/login',inputs)
            if(resp.data.success)
            {
                // console.log(resp.data.data)
                alert(resp.data.message)
                // localStorage.setItem("patientDetails",resp.data.data)
                console.log(resp.data.data)
                // localStorage.setItem('patientdetails', JSON.stringify(resp.data.data));
                // navigate("/pat_details")
                // const myObject = {
                //     _id:resp.data.data._id,
                //     email:resp.data.data.email,
                //     pName:resp.data.data.pName,
                //     guardianName : resp.data.data.guardianName,
                
                //     guardianPhone: resp.data.data.guardianPhone,
                //     hospitalEmail:resp.data.data.hospitalEmail,
                //     doctorEmail:resp.data.data.doctorEmail
                //   }
                  // initally using local storage we send the patientdetails in total now only resp.data.data._id
                //   window.localStorage.setItem("patientDetails", JSON.stringify(myObject));
                // {state:{redirectFrom:"guardian",id:resp.data.data._id}} , uselocation can be used to do so get the patientid 
                navigate("/pat_details",{state:{redirectFrom:"guardian",id:resp.data.data._id}})
            }
            else
            {
                alert(resp.data.message)
            }
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
        <h4>Login Guardian</h4>
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

export default LoginPatient