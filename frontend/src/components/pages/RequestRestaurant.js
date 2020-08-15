import React, { useState, useEffect } from 'react'
import RestaurantNav from './Navigation/RestaurantNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { CheckCircleOutlined } from '@ant-design/icons';
import Footer from './Footer'

function RequestRestaurant() {
  const [menuPost, setMenuPost] = useState([])
  const [previousMenu, setPreviousMenu] = useState([])
  const [doneRequests, setDoneRequests] = useState([])
  const [allResIds, setAllResIds] = useState([])
  const [allMenuIds, setAllMenuIds] = useState([])
  useEffect(() => {
    axios.get(`/restaurant/${localStorage.getItem("id")}`).then(res => {
      setAllResIds(res.data)
      let allMenugenId = []
      for (let i = 0; i < res.data.length; i++) {
        axios.get(`/menu/${res.data[i].id}`).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            allMenugenId.push(res.data[i].id)
          }
        })
      }
      setAllMenuIds(allMenugenId)
      axios.get('/order/all').then(res => {
        let menuBought = []
        let previousBought = []
        for (let i = 0; i < res.data.length; i++) {
          if (allMenugenId.includes(res.data[i].menu_id) && res.data[i].status === 'pending') {
            menuBought.push(res.data[i])
            console.log(res.data[i])
            setMenuPost([...menuBought])
          }
          else if (allMenugenId.includes(res.data[i].menu_id)) {
            previousBought.push(res.data[i])
            setPreviousMenu([...previousBought])
          }

        }
        axios.get(`/ordered-history/${localStorage.getItem("id")}`).then(res => {
          setDoneRequests(res.data)
        })
      })
    })
  }, [])

  const acceptRequest = (userId, menuId, index) => {
    axios.put(`/order/${userId}/${menuId}`, { status: "completed" }).then(res => {
      menuPost[index].status = "completed"
      axios.post(`/purchase-history/${userId}`, menuPost[index]).then(res => {
        // my id
        axios.post(`/ordered-history/${localStorage.getItem("id")}`, menuPost[index]).then(res => {
          window.location.reload()
        })
      })
    })
  }
  const declineRequest = (userId, menuId, index) => {
    axios.put(`/order/${userId}/${menuId}`, { status: "rejected" }).then(res => {
      menuPost[index].status = "rejected"
      axios.post(`/purchase-history/${userId}`, menuPost[index]).then(res => {
        console.log(res)
        axios.post(`/ordered-history/${localStorage.getItem("id")}`, menuPost[index]).then(res => console.log(res))
        window.location.reload()
      })
    })
  }
  const deleteOrder = (customerId, menuId) => {
    axios.delete(`/order/${customerId}/${menuId}`).then(() => window.location.reload())
  }

  return (
    <div>
      <RestaurantNav selected={"5"} />
      <div className="menuBanner">
        <img src="restaurants/fishchips.jpg" />
      </div>
      <div className="orderOuter">
        <div className="orderBox">
          <h2 style={{ margin: '30px' }}>Current Orders</h2>
          <ul style={{ marginTop: '40px' }}>
            {menuPost.map((el, index) => {
              return (<li key={el.createdAt}>
                <div className="order">
                  <img src={el.menu_pic} />
                  <div>{el.title}</div>
                  <div>${el.price}</div>
                  <div>{el.quantity}</div>
                  <div>{el.status}</div>
                  <div>
                    <Button style={{ marginRight: '0' }} onClick={() => acceptRequest(el.user_id, el.menu_id, index)}> ACCEPT</Button>
                    <Button onClick={() => declineRequest(el.user_id, el.menu_id, index)}>DECLINE</Button>
                  </div>
                  {/* <div>
                    <CheckCircleOutlined />
                  </div> */}
                </div>
              </li>)
            })}
          </ul>
        </div>
        <div className="orderBox">
          <h2 style={{ margin: '30px' }}>Resolved Orders</h2>
          <ul style={{ marginTop: '40px' }}>
            {doneRequests.map((el, index) => {
              return (<li key={el.id} >
                <div className="order" style={{ background: 'grey' }}>
                  <img src={el.menu_pic} />
                  <div>{el.title}</div>
                  <div>${el.price}</div>
                  <div>{el.createdAt}</div>
                  <div>{el.status}</div>
                  <div>
                    <Button style={{ marginRight: '0' }} onClick={() => deleteOrder(el.orderedBy, el.id)}> Delete</Button>
                  </div>
                </div>
              </li>)
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RequestRestaurant
