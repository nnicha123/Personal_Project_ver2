import React, { useState } from 'react'
import UserNav from './Navigation/UserNav'
import '../css/BookNow.css'
import { Button, Calendar, DatePicker, Space } from 'antd'
import MasterForm from './BookNow/MasterForm'
import LocalStorageService from '../../services/LocalStorageService'
import RestaurantNav from './Navigation/RestaurantNav'

function BookNow() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString)
  }

  const [date, setDate] = useState('')
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"8"} /> : <RestaurantNav selected={"10"} />}
      <MasterForm />
    </div>
  )
}

export default BookNow
