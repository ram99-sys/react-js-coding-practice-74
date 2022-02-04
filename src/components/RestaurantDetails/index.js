import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantData: [],
    restaurantItemsData: [],
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    // console.log(itemQuantity)
    // console.log(data)

    const updatedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
      foodItems: data.food_items,
      id: data.id,
    }
    // console.log(updatedData)
    const itemsData = updatedData.foodItems.map(eachObject => ({
      id: eachObject.id,
      name: eachObject.name,
      cost: eachObject.cost,
      rating: eachObject.rating,
      imageUrl: eachObject.image_url,
      foodType: eachObject.food_type,
      quantity: 1,
    }))
    // console.log(itemsData)
    this.setState({
      apiStatus: apiStatusConstants.success,
      restaurantData: updatedData,
      restaurantItemsData: itemsData,
    })
  }

  renderRestaurantDataView = () => {
    const {restaurantData} = this.state
    // console.log(restaurantData)
    const {
      costForTwo,
      cuisine,
      imageUrl,
      itemsCount,
      location,
      name,
      opensAt,
      rating,
      reviewsCount,
      id,
    } = restaurantData

    return (
      <div className="restaurant-bg-container">
        <img src={imageUrl} alt="" className="restaurant-image1" />
        <div>
          <h1 className="restaurant-name-data">{name}</h1>
          <p className="cuisine-data">{cuisine}</p>
          <p className="location-data">{location}</p>
          <div className="cost-rating-section">
            <div>
              <div className="icon-rating-section">
                <AiFillStar size={15} className="star" />
                <p className="rating-data">{rating}</p>
              </div>
              <p className="rating-count-data">{reviewsCount}+ Ratings</p>
            </div>
            <div className="cost-for-two-container">
              <p className="cost-for-two">&#8377;&nbsp;{costForTwo}</p>
              <p className="cost-for-two-text">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderRestaurantDataInProgressView = () => (
    <div className="restaurant-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderApiView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDataView()
      case apiStatusConstants.inProgress:
        return this.renderRestaurantDataInProgressView()
      default:
        return null
    }
  }

  renderRestaurantItemsDataView = () => {
    const {restaurantItemsData} = this.state

    return (
      <ul className="restaurant-items-container">
        {restaurantItemsData.map(eachRestaurantItem => (
          <RestaurantItem
            key={eachRestaurantItem.id}
            restaurantItemDetails={eachRestaurantItem}
          />
        ))}
      </ul>
    )
  }

  renderRestaurantItemsDataInProgressView = () => (
    <div className="restaurant-details-loader-container1">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantApiView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItemsDataView()
      case apiStatusConstants.inProgress:
        return this.renderRestaurantItemsDataInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderApiView()}</div>
        <div>{this.renderRestaurantApiView()}</div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
