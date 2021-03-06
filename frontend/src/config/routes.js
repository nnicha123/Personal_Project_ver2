import BookNow from '../components/pages/BookNow'
import Confirmation from '../components/pages/Confirmation'
import HomePage from '../components/pages/HomePage'
import Login from '../components/pages/Login'
import Menu from '../components/pages/Menu'
import MenuRestaurant from '../components/pages/MenuRestaurant'
import Promotions from '../components/pages/Promotions'
import Register from '../components/pages/Register'
import RegisterFail from '../components/pages/RegisterFail'
import RequestRestaurant from '../components/pages/RequestRestaurant'
import RestaurantProfile from '../components/pages/RestaurantProfile'
import RestaurantUserView from '../components/pages/RestaurantUserView'
import WaitingConfirmation from '../components/pages/WaitingConfirmation'
import YourOrders from '../components/pages/YourOrders'
import ContactUs from '../components/pages/ContactUs'
import BecomeOwner from '../components/pages/BecomeOwner'
import MyRestaurants from '../components/pages/MyRestaurants'
import MyRestaurantProfile from '../components/pages/MyRestaurantProfile'
import YourBookings from '../components/pages/YourBookings'
import BookingRequests from '../components/pages/BookingRequests'
import AboutSite from '../components/pages/AboutSite'

const components = {
  bookNow: {
    url: "/book-now",
    page: BookNow
  },
  confirmation: {
    url: "/confirm",
    page: Confirmation
  },
  home: {
    url: "/home",
    page: HomePage
  },
  login: {
    url: "/login",
    page: Login
  },
  menu: {
    url: "/menu",
    page: Menu
  },
  menuRes: {
    url: "/menu-restaurant",
    page: MenuRestaurant
  },
  promotions: {
    url: "/promotions",
    page: Promotions
  },
  register: {
    url: "/register",
    page: Register
  },
  registerFail: {
    url: "/register-fail",
    page: RegisterFail
  },
  requestRes: {
    url: "/request-restaurant",
    page: RequestRestaurant
  },
  restaurantProfile: {
    url: "/restaurant-profile",
    page: RestaurantProfile
  },
  restaurantUserView: {
    url: "/user-restaurant",
    page: RestaurantUserView
  },
  waitingConfirmation: {
    url: "/waiting-confirm",
    page: WaitingConfirmation
  },
  yourOrders: {
    url: "/your-orders",
    page: YourOrders
  },
  contactUs: {
    url: "/contact-us",
    page: ContactUs
  },
  becomeOwner: {
    url: "/become-owner",
    page: BecomeOwner
  },
  myRestaurants: {
    url: "/my-restaurants",
    page: MyRestaurants
  },
  myRestaurantProfile: {
    url: "/my-restaurants/profile",
    page: MyRestaurantProfile
  },
  yourBookings: {
    url: "/your-bookings",
    page: YourBookings
  },
  bookingRequests: {
    url: "/booking-requests",
    page: BookingRequests
  },
  aboutSite: {
    url: "/about-site",
    page: AboutSite
  }
};

export default {
  guest: [
    components.login,
    components.register,
    components.registerFail,
    components.contactUs,
    components.aboutSite
  ],
  user: [
    components.yourOrders,
    components.bookNow,
    components.waitingConfirmation,
    components.confirmation,
    components.home,
    components.menu,
    components.promotions,
    components.restaurantUserView,
    components.contactUs,
    components.becomeOwner,
    components.yourBookings,
    components.aboutSite
  ],
  'restaurant-owner': [
    components.home,
    components.menu,
    components.promotions,
    components.restaurantUserView,
    components.myRestaurants,
    components.restaurantProfile,
    components.requestRes,
    components.menuRes,
    components.contactUs,
    components.yourOrders,
    components.myRestaurantProfile,
    components.becomeOwner,
    components.bookNow,
    components.yourBookings,
    components.bookingRequests,
    components.aboutSite
  ]
}