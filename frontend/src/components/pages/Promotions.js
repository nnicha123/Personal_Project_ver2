import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import axios from '../../config/axios'
import '../css/Promotions.css'
import { Button } from 'antd'
import { StarFilled } from '@ant-design/icons';

function Promotions() {
  const [selectedProMenu, setSelectedProMenu] = useState([])
  useEffect(() => {
    axios.get('/menu').then(res => {
      let promoOnly = res.data.filter(el => el.promotion === true)
      setSelectedProMenu(promoOnly)
    })
  }, [])
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"4"} /> : <RestaurantNav selected={"4"} />}
      <div className="homeBanner">
        <img src="restaurants/fishchips.jpg" />
      </div>
      <div className="topResOuter">
        <h3 style={{ margin: '20px' }}>Today's Promotions!!!</h3>
        <div className="mypromotionRestaurants">
          {selectedProMenu.map(el => {
            return (
              <div key={el.id} className="promotionRestaurants">
                <div className="promotionImageDiv">
                  <img src={el.menu_pic} />
                </div>
                <div className="promotioncontentDiv">
                  <div>
                    <div>{el.title}</div>
                    {/* <div>Rating : {el.average_rating}/5</div> */}
                  </div>
                  <Button style={{ width: '70px' }}>View</Button>
                  <StarFilled style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'yellow' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Promotions
