import React, { useState } from 'react'
import UserNav from './Navigation/UserNav'
import '../css/BookNow.css'
import { Button, Calendar, DatePicker, Space } from 'antd'
import MasterForm from './BookNow/MasterForm'

function BookNow() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString)
  }

  const [date, setDate] = useState('')
  return (
    <div>
      <UserNav selected={"8"} />
      <MasterForm />
    </div>
  )
}

export default BookNow
