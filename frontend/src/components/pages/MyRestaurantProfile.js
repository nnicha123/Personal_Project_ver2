import React, { useState, useEffect } from 'react'
import '../css/MyRestaurantProfile.css'
import { Button, Input } from 'antd'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import MenuRestaurant from './MenuRestaurant'

function MyRestaurantProfile(props) {
  const [restaurantId, setRestaurantId] = useState(props.chosen.id)
  const [menu, setMenu] = useState([])
  const [changeCoverPic, setCoverPic] = useState(false)
  const [coverPic, setNewCoverPic] = useState('')

  const getMenus = () => {
    localStorage.setItem("resId", restaurantId)
    window.location.replace('/menu-restaurant')
  }

  const changeCoverPicHandler = () => {
    axios.put(`/restaurant/${localStorage.getItem("resId")}`, { cover_pic: coverPic }).then(res => console.log(res))
  }

  return (
    <div className="outerProfile">
      {/* {props.chosen.name} */}
      <div className="image-bannerMyRestaurant">
        <img src={props.chosen.cover_pic} />
        {!changeCoverPic && <Button className="changeCover" onClick={() => setCoverPic(true)}>Change cover</Button>}
        {changeCoverPic && <span>
          <Input type="text" value={coverPic} onChange={(e) => setNewCoverPic(e.target.value)} />
          <Button onClick={() => { changeCoverPicHandler() }}>Submit</Button>
        </span>}
      </div>
      <div className="profileContents">
        <h3 style={{ marginLeft: '10px', fontSize: '40px' }}>{props.chosen.name}</h3>
        <div className="rating-info">
          <span>CURRENT RATING : {props.chosen.average_rating}/5</span>
        </div>
        <div className="rating-info">
          <span>RATE THIS RESTAURANT</span>
        </div>
        <div className="description">
          {props.chosen.description}
          <div className="ButtonGroup">
            <Button onClick={getMenus}>
              View menus
            </Button>
            <Button>Customize</Button>
            <Button>Back</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyRestaurantProfile
