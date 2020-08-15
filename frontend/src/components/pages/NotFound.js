import React from 'react'
import '../css/NotFound.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="outerNotFound">
      <div className="notFound">
        YOU HAVE NO PERMISSION TO COME INTO THIS PAGE
      </div>
      <div>
        <Button type="primary" className="redirectHome">
          {(localStorage.getItem("Role") === 'user' || localStorage.getItem("Role") === 'restaurant-owner') && <Link to='/home'>Back</Link>}
          {!(localStorage.getItem("Role") === 'user' || localStorage.getItem("Role") === 'restaurant-owner') && <Link to='/login'>Back</Link>}
        </Button>
      </div>
    </div>
  )
}

export default NotFound
