import React, { useState, useEffect } from 'react'
import RestaurantNav from './Navigation/RestaurantNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { CheckCircleOutlined } from '@ant-design/icons';

function BookingRequests() {
  const [menuPost, setMenuPost] = useState([])
  const [allResIds, setAllResIds] = useState([])
  const [allMenuIds, setAllMenuIds] = useState([])
  useEffect(() => {
    axios.get(`/restaurant/${localStorage.getItem("id")}`).then(res => {
      // console.log(res.data)
      setAllResIds(res.data)
      let allMenugenId = []
      for (let i = 0; i < res.data.length; i++) {
        allMenugenId.push(res.data[i].id)
      }
      setAllMenuIds(allMenugenId)
      axios.get('/book/all').then(res => {
        let menuBought = []
        let previousBought = []
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i])

          if (allMenugenId.includes(res.data[i].restaurant_id)) {
            menuBought.push(res.data[i])
            setMenuPost([...menuBought])
          }
        }
      })
    })
  }, [])

  const acceptRequest = (userId, restaurantId, index) => {
    axios.put(`/book/${userId}/${restaurantId}`, { status: "completed" }).then(res => {
      menuPost[index].status = "completed"
    })
  }
  const declineRequest = (userId, restaurantId, index) => {
    axios.put(`/book/${userId}/${restaurantId}`, { status: "rejected" }).then(res => {
      menuPost[index].status = "rejected"
    })
  }
  const deleteOrder = (customerId, menuId) => {
    axios.delete(`/order/${customerId}/${menuId}`).then(() => window.location.reload())
  }

  return (
    <div>
      <RestaurantNav />
      <div className="orderOuter">
        <div className="orderBox">
          <h2 style={{ margin: '30px' }}>Your Booking Requests</h2>
          <ul style={{ marginTop: '40px' }}>
            {menuPost.map((el, index) => {
              return (<li key={el.createdAt}>
                <div className="order">
                  <div>{el.date}</div>
                  <div>{el.time}</div>
                  <div>{el.status}</div>
                  <div>
                    <Button style={{ marginRight: '0' }} onClick={() => acceptRequest(el.user_id, el.restaurant_id, index)}> ACCEPT</Button>
                    <Button onClick={() => declineRequest(el.user_id, el.restaurant_id, index)}>DECLINE</Button>
                  </div>
                  {/* <div>
                    <CheckCircleOutlined />
                  </div> */}
                </div>
              </li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BookingRequests
