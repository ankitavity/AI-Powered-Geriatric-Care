import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Link,} from 'react-router-dom'
const Home = () => {
  return (
    <div className='outer-box home-box '>
      <br/><br/><br/><br/><br/><br/><br/><br/> <br/>
      <h1>Welcome To Geriatric Care</h1>
     <div className='d-flex justify-content-center align-items-center flex-row'>
     <ButtonGroup aria-label="Basic example">
    <div className='d-flex align-items-center gap-2 p-5'>
      <Link to="/register_pat"> <Button variant="secondary" >Register as Patient</Button></Link>
      <Link to="/register_dr"> <Button variant="primary" >Register as Doctor</Button></Link>
      <Link to="/register_hosp"> <Button variant="secondary" >Register as Hospital</Button></Link>
     </div>
     <div className='d-flex align-items-center gap-2'>
     <Link to="/login_pat"> <Button variant="primary" >Login as Guardian</Button></Link>
     <Link to="/login_dr"> <Button variant="secondary" >Login as Doctor</Button></Link>
     <Link to="/login_hosp"> <Button variant="primary" >Login as Hospital</Button></Link>
     </div>
    </ButtonGroup>
     </div>
    </div>
  )
}

export default Home