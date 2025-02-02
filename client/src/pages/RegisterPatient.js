import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Form, Input, message } from 'antd'
 

const RegisterPatient = () => {
    const navigate = useNavigate()
    // const [inputs, setInputs] = React.useState({});
    // //update :using antd inputs ,setInputs ( each event or key press is targeted )is replaced  as an already formed json is delivered on onSubmit .
    // const handleChange = (event) => {
    //     //assumption doc name considered unique 
    //     //at each change json object formed -- original inputs
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({
    //         ...values,
    //         [name]: value
    //     }))
    // }

    //    console.log(inputs)

    const submitHandler = async (inputs) => {


        // console.log(inputs)
        try {
            const resp = await axios.post('http://192.168.38.220:8000/api/v1/patient/register', inputs)
            if (resp.data.success) {
                alert("Registered successfully")
               //message.success("Registered successfully")
                navigate("/")
            }
            else {
                // message.error(resp.data.message)
                alert(resp.data.message)
            }
        }
        catch (error) {
            // message.error(error)
            alert("error")
        }

    }

    return (
        <div className='outer-box'>
        <div className='form-box'>
            <Form layout='vertical' onFinish={submitHandler}>
                <h1> Register Patient </h1>
                <Form.Item label="Patient Name" name="pName">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" />
                </Form.Item>
                <Form.Item label="Patient Address" name="address">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Guardian Name" name="guardianName">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Guardian Phone" name="guardianPhone">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Hospital Email" name="hospitalEmail">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Doctor Email" name="doctorEmail">
                    <Input type="email"  />
                </Form.Item>
                <button className="btn btn-primary">
                    Submit
                </button>
            </Form>
            </div>

        </div>
    )
}

export default RegisterPatient