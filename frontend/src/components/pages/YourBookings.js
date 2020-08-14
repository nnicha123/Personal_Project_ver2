import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { PlusCircleOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/LocalStorageService'
import RestaurantNav from './Navigation/RestaurantNav'


function YourBookings() {

  const [newQuantity, setNewQuantity] = useState(1)
  const [yourOrders, setYourOrders] = useState([])
  const [userId, setUserId] = useState(localStorage.getItem("id"))
  const [restaurantInfo, setRestaurantInfo] = useState([])

  useEffect(() => {
    axios.get(`/book`).then(res => {
      // console.log(res.data)
      setYourOrders(res.data)
    })
  }, [])
  const cancelBuy = (restaurantId) => {
    axios.delete(`/book/${userId}/${restaurantId}`).then(res => {
      window.location.reload()
    })
  }
  const updateQuantity = (menuId) => {
    axios.put(`/order/${userId}/${menuId}`, { quantity: newQuantity }).then(res => { window.location.reload() })
  }
  const deletePurchaseHistory = (id) => {
    axios.delete(`/purchase-history/${userId}/${id}`).then(res => window.location.reload())
  }
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"9"} /> : <RestaurantNav selected={"11"} />}
      <div className="orderOuter">
        <div className="orderBox">
          <h2 style={{ margin: '30px', marginBottom: '0' }} >Your Bookings</h2>
          <ul style={{ marginTop: '40px' }}>
            {yourOrders.map((el, index) => {
              return (<li key={el.id}>
                <div className={"order " + (el.status === 'completed' ? 'green' : el.status === 'rejected' ? 'red' : null)}>
                  {/* <img src={el.menu_pic} /> */}
                  <div>{el.restaurantName}</div>
                  <div>{el.date}</div>
                  <div>{el.time}</div>
                  <div>{el.status}</div>
                  <div>
                    {/* <Button type="primary" style={{ margin: 0 }}>Update</Button> */}
                    <Button onClick={() => cancelBuy(el.restaurant_id)}>Cancel</Button>

                  </div>
                </div>
              </li>)
            })}
            <li>
              <div className="orderDark" onClick={() => window.location.replace('/home')}>
                <PlusCircleOutlined />
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default YourBookings
