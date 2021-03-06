import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Rate } from 'antd'
import { StarFilled, ShoppingFilled } from '@ant-design/icons';
import axios from '../../config/axios'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import '../css/RestaurantUserView.css'
import Footer from './Footer'

function RestaurantUserView(props) {
  const [user_id, setUserId] = useState(localStorage.getItem("id"))
  const [restaurant_id, setRestaurantId] = useState(localStorage.getItem("resId"))
  const [restaurant, setRestaurant] = useState({})
  // const [viewMenu, setViewMenu] = useState(false)
  const [menus, setMenus] = useState([])
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [feedbacks, setFeedbacks] = useState([])
  const [avg_rating, setAvgRating] = useState(0)
  const [randomRating, setRandomRating] = useState([])

  const addRestaurantFeedback = () => {
    if (comment && rating != 0) {
      axios.post(`/feedback-rest/${localStorage.getItem("resId")}`, { no_of_stars: rating, comment: comment }).then(res => {
        window.location.reload()
      })
    }
  }
  const buyItem = (index) => {
    console.log(menus[index])
    let values = menus[index]
    values["status"] = "pending"
    values["user_id"] = localStorage.getItem("id")
    axios.post(`/order/${user_id}/${menus[index].id}`, values).then(res => { window.location.replace('/your-orders') })
  }

  useEffect(() => {
    axios.get(`/restaurant/${user_id}/${restaurant_id}`).then(res => {
      console.log(res.data)
      setRestaurant(res.data)
      axios.get(`/menu/${restaurant_id}`).then(res => {
        setMenus(res.data)
        let randRateArr = []
        for (let i = 0; i < res.data.length; i++) {
          let randRate = Math.floor(Math.random() * 6) + 1
          randRateArr.push(randRate)
          // console.log(randRateArr)
        }
        setRandomRating(randRateArr)
        axios.get(`/feedback-rest/${restaurant_id}`).then(res => {
          // console.log(res.data)
          setFeedbacks(res.data)
          let averageRating = 0
          let sum = 0
          for (let i = 0; i < res.data.length; i++) {
            sum += Number(res.data[i].no_of_stars)
          }
          averageRating = sum / res.data.length
          if (!averageRating) {
            averageRating = 0
          }
          setAvgRating(averageRating)
          axios.put(`/restaurant/${restaurant_id}`, { average_rating: averageRating }).then(res => { })
        })
      })
    })
  }, [])
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"8"} /> : <RestaurantNav selected={"2"} />}
      <div className="outerProfile">
        {/* {restaurant.name} */}
        <div className="usermenuBanner">
          <img src={restaurant.cover_pic} />
        </div>
        <div className="topResOuter">
          <div className="profileContents">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h3 className="resH3Name">{restaurant.name}</h3>
              <Button type="primary">
                <Link to="/book-now">Book Now</Link>
              </Button>
            </div>
            <p style={{ fontSize: '20px' }}>{restaurant.description}</p>
            <div style={{ marginBottom: '30px' }}>
              <h3>Average Rating : {avg_rating}/5 <Rate allowHalf value={avg_rating} /></h3>
            </div>
            {
              feedbacks.map(el => {
                return (<div className="descriptionSmall">
                  {!el.reported && <div>
                    <div>{el.comment}</div>
                    <Rate allowHalf value={el.no_of_stars} style={{ display: 'flex' }} />
                  </div>}
                  {
                    el.reported && <div className="commentTop">
                      <i>This comment is inappropriate</i>
                    </div>
                  }
                </div>)

              })
            }
            <div className="description">
              <div style={{ marginBottom: '15px' }}>
                <span>Rate This Restaurant :
            <select class="ratingInput" name="rating" onChange={(e) => setRating(e.target.value)}>
                    {/* <option value="">-- Rate --</option> */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </span>
              </div>
            Add Comments
            <textarea className="textArea" type="text" style={{ width: '100%', margin: '10px 0' }} value={comment} onChange={(e) => setComment(e.target.value)} />
              <div>
                <Button type="primary" style={{ margin: 0 }} onClick={() => addRestaurantFeedback()}>Add Feedback</Button>
                <Button>
                  <Link to="/home">Back</Link>
                </Button>
              </div>
            </div>
            <div className="myUserView">
              {menus.map((el, index) => {
                return (
                  <div key={el.id} className="homeRestaurants">
                    <div className="homeImageDiv">
                      <img src={el.menu_pic} />
                    </div>
                    {el.promotion && <StarFilled style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'yellow' }} />}
                    <div className="contentDiv">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div>{el.title}</div>
                        <div><b>${el.price}</b></div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div><Rate allowHalf value={randomRating[index]} /></div>
                        <div>
                          <ShoppingFilled style={{ fontSize: '20px', color: '#001529' }} onClick={() => { buyItem(index) }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>




        </div>
      </div>
      <Footer />
    </div >
  )
}

export default RestaurantUserView
