import React, { useEffect, useState } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import '../css/HomePage.css'
import axios from '../../config/axios'
import '../css/HomePage.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function HomePage() {

  const view = (index) => {
    console.log(selectedRes[index])
    localStorage.setItem("resId", selectedRes[index].id)
    window.location.replace('/user-restaurant')
  }

  const [selectedRes, setSelectedRes] = useState([])
  useEffect(() => {
    localStorage.removeItem("resId")
    axios.get('/restaurant').then(res => {
      setSelectedRes(res.data)
    })
  }, [])


  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"2"} /> : <RestaurantNav selected={"2"} />}
      <div className="homeBanner">
        <img src="restaurants/fishships3.jpg" />
      </div>
      <div className="topResOuter">
        <h3 style={{ margin: '20px', marginBottom: '5px' }}>Dine in at our Top Restaurants!</h3>
        <h3 style={{ marginLeft: '20px', marginTop: '0px' }}>Not free to dine in? Not a problem! Checkout our takeaways!
        <span><Button type="primary"><Link to="/menu">Menu</Link></Button></span>
        </h3>

        <div className="myhomeRestaurants">
          {selectedRes.map((el, index) => {
            return (
              <div key={el.id} className="homeRestaurants">
                <div className="homeImageDiv">
                  <img src={el.profile_pic} />
                </div>
                <div className="contentDiv">
                  <div>
                    <div>{el.name}</div>
                    <div>Rating : {el.average_rating}/5</div>
                  </div>
                  <Button style={{ width: '70px' }} onClick={() => { view(index) }}>View</Button>
                </div>
              </div>

            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomePage
