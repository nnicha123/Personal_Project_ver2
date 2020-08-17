import React, { useEffect, useState } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import '../css/HomePage.css'
import axios from '../../config/axios'
import '../css/HomePage.css'
import { Button, Rate } from 'antd'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function HomePage() {

  const view = (index) => {
    console.log(selectedRes[index])
    localStorage.setItem("resId", selectedRes[index].id)
    window.location.replace('/user-restaurant')
  }

  const [selectedRes, setSelectedRes] = useState([])
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    localStorage.removeItem("resId")
    axios.get('/restaurant').then(res => {
      setSelectedRes(res.data)
      axios.get(`/notification/${localStorage.getItem("id")}`).then(res => {
        if (res.data.booking_request || res.data.menu_request || res.data.your_booking || res.data.your_order) {
          setNotification(true)
        }
      }
      )
    })
  }, [])


  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"2"} /> : <RestaurantNav selected={"2"} notify={notification} />}
      <div className="homeBanner">
        <img src="restaurants/fishchips.jpg" />
      </div>
      <div className="topResOuter">
        <div style={{ width: '80%', margin: '0 auto', paddingTop: '30px' }}>
          <h2 style={{ marginLeft: '10px' }}>Dine in at our Top Restaurants!</h2>
          <h3 style={{ marginLeft: '10px' }}>Not free to dine in? Not a problem! Checkout our takeaways!
          <span> <Button type="primary"><Link to="/menu">Menu</Link></Button></span>
          </h3>
        </div>
        <div className="myhomeRestaurants" style={{ margin: '0 auto' }}>
          {selectedRes.map((el, index) => {
            return (
              <div key={el.id} className="homeRestaurants">
                <div className="homeImageDiv">
                  <img src={el.profile_pic} />
                </div>
                <div className="contentDiv">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>{el.name}</div>
                    <div><Button className="buttonView" onClick={() => { view(index) }}>View</Button></div>
                  </div>
                  <div><Rate allowHalf value={el.average_rating} /></div>
                </div>
                <div style={{ width: '100%', textAlign: 'right', padding: '5px' }}>
                </div>
              </div>

            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
