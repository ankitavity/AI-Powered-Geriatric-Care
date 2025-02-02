import React from 'react'
import { Form, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterDr = () => {
  const navigate = useNavigate()
  const submitHandler = async (inputs) => {
    // console.log(inputs)
    try {
      console.log(inputs);
      const resp = await axios.post('http://192.168.38.220:8000/api/v1/dr/register', inputs)
      if (resp.data.success) {
        alert("Registered successfully")
        //message.success("Registered successfully")
        navigate("/")
      }
      else {
        // message.error(resp.data.message)
        alert("error kahan aya")
      }
    }
    catch (error) {
      // message.error(error)
      alert(error)
    }

  }

  return (
    <div className='outer-box'>
      <div className='form-box'>
        <Form layout='vertical' onFinish={submitHandler}>
          <h4> Register Doctor </h4>
          <Form.Item label="Doctor Name" name="drName">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>

          <Form.Item label="Doctor Phone" name="drPhone">
            <Input type="text" />
          </Form.Item>

          <button className="btn btn-primary">
            Submit
          </button>
        </Form>
      </div>
    </div>
  )
}

export default RegisterDr