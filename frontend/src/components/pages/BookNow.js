import React, { useState } from 'react'
import UserNav from './Navigation/UserNav'
import '../css/BookNow.css'
import { Button, Calendar, DatePicker, Space } from 'antd'
import MasterForm from './BookNow/MasterForm'
import LocalStorageService from '../../services/LocalStorageService'
import RestaurantNav from './Navigation/RestaurantNav'

function BookNow() {
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav /> : <RestaurantNav />}
      <div className="topResOuter">
        <MasterForm />
      </div>
    </div>
  )
}

export default BookNow
