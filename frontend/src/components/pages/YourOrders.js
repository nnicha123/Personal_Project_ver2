import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { PlusCircleOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/LocalStorageService'
import RestaurantNav from './Navigation/RestaurantNav'


function YourOrders() {

  useEffect(() => {
    axios.get('/order').then(res => {
      console.log(res.data)
      setYourOrders(res.data)
    })
  }, [])
  const cancelBuy = (menuId) => {
    axios.delete(`/order/${menuId}`).then(res => {
      window.location.reload()
    })
  }
  const [yourOrders, setYourOrders] = useState([])
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"5"} /> : <RestaurantNav selected={"8"} />}
      <div className="orderOuter">
        <div className="orderBox">
          <ul style={{ marginTop: '40px' }}>
            {yourOrders.map(el => {
              return (<li key={el.id}>
                <div className={"order " + (el.status === 'completed' ? 'green' : el.status === 'rejected' ? 'red' : null)}>
                  <img src={el.menu_pic} />
                  <div>{el.title}</div>
                  <div>${el.price}</div>
                  <div>{el.createdAt}</div>
                  <div>{el.status}</div>
                  <Button onClick={() => cancelBuy(el.menu_id)}>CANCEL</Button>
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
  )
}

export default YourOrders
