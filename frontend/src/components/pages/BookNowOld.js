import React, { useState } from 'react'
import UserNav from './Navigation/UserNav'
import '../css/BookNow.css'
import { Button, Calendar, DatePicker, Space } from 'antd'

function BookNowOld() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString)
  }

  const [date, setDate] = useState('')
  return (
    <div>
      <UserNav selected={"8"} />
      <div className="bookingOuter">
        <div className="steps">
          <h3>STEP 1 : Select Date</h3>

          <div class="calendar">
            <DatePicker onChange={onChange} />
            You Chose:{date}
          </div>
        </div>
        <div className="steps">
          <h3>STEP 2 : Check Restaurant Data</h3>
          <div class="newCalendar"></div>
        </div>
        <div className="stepsSmall">
          <h3>STEP 3 : Upload Payment evidence</h3>
          <div class="upload">
            <Button >Upload</Button>
          </div>
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  )
}

export default BookNowOld
