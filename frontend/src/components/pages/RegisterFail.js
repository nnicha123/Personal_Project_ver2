import React from 'react'
import GuestNav from './Navigation/GuestNav'
import { Button } from 'antd'
import { Link, Router } from 'react-router-dom'
import '../css/RegisterFail.css'

function RegisterFail() {
  return (
    <div className="RegisterOuter">
      <GuestNav selected={"3"} />
      <div className="registerFail">
        <div className="innerFail">
          <h1>SOMETHING WENT WRONG</h1>
          <h3>Please try again or contact customer service</h3>
          <div className="buttonDiv" style={{ display: 'flex' }}>
            <Button>
              <Link to='/register'>TRY AGAIN</Link>
            </Button>
            <Button>
              <Link to='/contact-us'>CONTACT US</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterFail
