import React, { useState, useEffect } from 'react'
import RestaurantNav from './Navigation/RestaurantNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { PlusCircleOutlined } from '@ant-design/icons';
import Footer from './Footer'

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
      window.location.reload()
    })
  }
  const declineRequest = (userId, restaurantId, index) => {
    axios.put(`/book/${userId}/${restaurantId}`, { status: "rejected" }).then(res => {
      menuPost[index].status = "rejected"
      window.location.reload()
    })
  }
  const deleteOrder = (customerId, menuId) => {
    axios.delete(`/order/${customerId}/${menuId}`).then(() => window.location.reload())
  }

  return (
    <div>
      <RestaurantNav />
      <div className="homeBanner">
        <img src="restaurants/fishchips.jpg" />
      </div>
      <div className="topResOuter">
        <div className="orderOuter">
          <div className="orderBox">
            <h2 style={{ margin: '30px', marginBottom: '0' }}>Current Booking Requests</h2>
            <ul style={{ marginTop: '40px' }}>
              {menuPost.map((el, index) => {
                return (<li key={el.createdAt}>
                  {el.status == 'pending' && <div className={"order " + (el.status === 'completed' ? 'green' : el.status === 'rejected' ? 'red' : null)}>
                    <div>{el.restaurantName}</div>
                    <div>{el.date.substr(0, 10)}, {el.time}</div>
                    <div>Paid: ${el.paidTotal}</div>
                    <div>{el.status}</div>
                    <div>
                      <Button style={{ marginRight: '0' }} onClick={() => acceptRequest(el.user_id, el.restaurant_id, index)}> ACCEPT</Button>
                      <Button onClick={() => declineRequest(el.user_id, el.restaurant_id, index)}>DECLINE</Button>
                    </div>
                  </div>}
                </li>)
              })}

            </ul>
          </div>
          <div className="orderBox">
            <h2 style={{ margin: '30px' }}>Resolved Booking Requests</h2>
            <ul style={{ marginTop: '40px' }}>
              {menuPost.map((el, index) => {
                return (<li key={el.createdAt}>
                  {el.status != 'pending' && <div className="order " style={{ background: 'grey' }}>
                    <div>{el.restaurantName}</div>
                    <div>{el.date}, {el.time}</div>
                    <div>Paid: ${el.paidTotal}</div>
                    <div>{el.status}</div>
                    <div>
                      <Button>Delete</Button>
                    </div>
                  </div>}
                </li>)
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BookingRequests
