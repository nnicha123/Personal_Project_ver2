import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import axios from '../../config/axios'
import '../css/Promotions.css'
import { Button, Rate } from 'antd'
import { StarFilled } from '@ant-design/icons';
import Footer from './Footer'

function Promotions() {
  const [selectedProMenu, setSelectedProMenu] = useState([])
  const [randomRating, setRandomRating] = useState([])

  useEffect(() => {
    axios.get('/menu').then(res => {
      let promoOnly = res.data.filter(el => el.promotion === true)
      setSelectedProMenu(promoOnly)
      let randRateArr = []
      for (let i = 0; i < res.data.length; i++) {
        let randRate = Math.floor(Math.random() * 6) + 1
        randRateArr.push(randRate)
        console.log(randRateArr)
      }
      setRandomRating(randRateArr)
    })
  }, [])
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"4"} /> : <RestaurantNav selected={"4"} />}
      <div className="homeBanner">
        <img src="restaurants/fishchips.jpg" />
      </div>
      <div className="topResOuter">
        <div style={{ width: '80%', margin: '0 auto', paddingTop: '30px' }}>
          <h2 style={{ margin: '30px 10px' }}>Today's Promotions!!!</h2>
        </div>
        <div className="myhomeRestaurants" style={{ margin: '0 auto' }}>
          {selectedProMenu.map((el, index) => {
            return (
              <div key={el.id} className="homeRestaurants">
                <div className="homeImageDiv">
                  <img src={el.menu_pic} />
                </div>
                <div className="contentDiv">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>{el.title}</div>
                    <div><Button style={{ width: '70px' }}>View</Button></div>
                    {/* <div>Rating : {el.average_rating}/5</div> */}
                  </div>
                  <div><Rate allowHalf value={randomRating[index]} /></div>
                  <StarFilled style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'yellow' }} />
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

export default Promotions
