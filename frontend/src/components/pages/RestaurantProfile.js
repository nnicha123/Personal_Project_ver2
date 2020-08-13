import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function RestaurantProfile() {
  return (
    <div>
      RestaurantProfile
      <Button>
        <Link to="/home">Back</Link>
      </Button>
    </div>
  )
}

export default RestaurantProfile
