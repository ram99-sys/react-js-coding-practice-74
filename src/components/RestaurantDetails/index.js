import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

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
    console.log(data)
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
    }))
    console.log(itemsData)
    this.setState({
      apiStatus: apiStatusConstants.success,
      restaurantData: updatedData,
      restaurantItemsData: itemsData,
    })
  }

  renderRestaurantDataView = () => {
    const {restaurantData} = this.state
    console.log(restaurantData)
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
        <img src={imageUrl} alt="" className="restaurant-image" />
        <div>
          <h1>{name}</h1>
          <p>{cuisine}</p>
          <p>{location}</p>
        </div>
      </div>
    )
  }

  renderRestaurantDataInProgressView = () => <h1>In Progress</h1>

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

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderApiView()}</div>
      </div>
    )
  }
}

export default RestaurantDetails
