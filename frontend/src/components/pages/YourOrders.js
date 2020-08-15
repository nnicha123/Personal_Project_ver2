import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { PlusCircleOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/LocalStorageService'
import RestaurantNav from './Navigation/RestaurantNav'
import Footer from './Footer'


function YourOrders() {

  const [newQuantity, setNewQuantity] = useState(1)
  const [yourOrders, setYourOrders] = useState([])
  const [purchaseHistory, setPurchaseHistory] = useState([])
  const [userId, setUserId] = useState(localStorage.getItem("id"))

  useEffect(() => {
    axios.get('/order').then(res => {
      console.log(res.data)
      setYourOrders(res.data)
      axios.get(`/purchase-history/${userId}`).then(res => {
        setPurchaseHistory(res.data)
      })
    })
  }, [])
  const cancelBuy = (menuId) => {
    axios.delete(`/order/${userId}/${menuId}`).then(res => {
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
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"5"} /> : <RestaurantNav selected={"8"} />}
      <div className="homeBanner">
        <img src="restaurants/fishchips.jpg" />
      </div>
      <div className="topResOuter">
        <div className="orderOuter">
          <div className="orderBox">
            <h2 style={{ margin: '30px', marginBottom: '0' }} >Pending Orders</h2>
            <ul style={{ marginTop: '40px' }}>
              {yourOrders.map((el, index) => {
                return (<li key={el.id}>
                  {el.status === 'pending' && <div className={"order "}>
                    <img src={el.menu_pic} />
                    <div>{el.title}</div>
                    <div>{el.quantity} x ${el.price}</div>
                    <div>
                      <div>
                        <select name="Quantity" onChange={(e) => setNewQuantity(e.target.value)}>
                          <option value="">no.</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                    </div>
                    <div>{el.status}</div>
                    <div>
                      <Button type="primary" style={{ margin: 0 }} onClick={() => updateQuantity(el.menu_id)}>Update</Button>
                      <Button onClick={() => cancelBuy(el.menu_id)}>Cancel</Button>

                    </div>
                  </div>}
                </li>)
              })}
              <li>
                <div className="orderDark" onClick={() => window.location.replace('/menu')}>
                  <PlusCircleOutlined />
                </div>
              </li>
            </ul>
          </div>
          <div className="orderBox">
            <h2 style={{ margin: '30px', marginBottom: '0' }} >Purchase History</h2>
            <ul style={{ marginTop: '40px' }}>
              {purchaseHistory.map((el, index) => {
                return (<li key={el.id}>
                  <div className={"order " + (el.status === 'completed' ? 'green' : el.status === 'rejected' ? 'red' : null)}>
                    <img src={el.menu_pic} />
                    <div>{el.title}</div>
                    <div>{el.quantity} x ${el.price}</div>

                    <div>{el.status}</div>
                    <div>
                      <Button onClick={() => deletePurchaseHistory(el.id)}>Delete</Button>
                    </div>
                  </div>
                </li>)
              })}
              <li>
                <div className="orderDark" onClick={() => window.location.replace('/menu')}>
                  <PlusCircleOutlined />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default YourOrders
