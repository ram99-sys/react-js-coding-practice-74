import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {
  AiOutlineLeftSquare,
  AiOutlineRightSquare,
  AiFillStar,
} from 'react-icons/ai'
import {BsFilterRight} from 'react-icons/bs'
import Header from '../Header'
import Carousel from '../Carousel'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const restaurantsDataApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    restaurantData: [],
    apiStatus: restaurantsDataApiStatusConstants.initial,
    activePage: 1,
    totalPageCount: 0,
    activeOptionId: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    const {activeOptionId} = this.state
    this.setState({apiStatus: restaurantsDataApiStatusConstants.inProgress})
    const {activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantsApiUrl, options)
    // console.log(response)
    const data = await response.json()
    const totalRecords = data.total
    // console.log(totalRecords)
    const totalPages = Math.ceil(totalRecords / limit)
    const updatedData = data.restaurants.map(eachObject => ({
      costForTwo: eachObject.cost_for_two,
      cuisine: eachObject.cuisine,
      groupByTime: eachObject.group_by_time,
      hasOnlineDelivery: eachObject.has_online_delivery,
      hasTableBooking: eachObject.has_table_booking,
      id: eachObject.id,
      imageUrl: eachObject.image_url,
      isDeliveringNow: eachObject.is_delivering_now,
      location: eachObject.location,
      menuType: eachObject.menu_type,
      name: eachObject.name,
      opensAt: eachObject.opens_at,
      rating: eachObject.user_rating.rating,
      ratingColor: eachObject.user_rating.rating_color,
      ratingText: eachObject.user_rating.rating_text,
      totalReviews: eachObject.user_rating.total_reviews,
    }))
    // console.log(updatedData)
    this.setState({
      totalPageCount: totalPages,
      apiStatus: restaurantsDataApiStatusConstants.success,
      restaurantData: updatedData,
    })
    // console.log(totalPages)
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsData,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage, totalPageCount} = this.state
    if (activePage < totalPageCount) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantsData,
      )
    }
  }

  renderSuccessView = () => {
    const {restaurantData} = this.state
    // console.log(restaurantData)

    return (
      <ul className="restaurant-details-container">
        {restaurantData.map(eachObject => (
          <Link
            to={`/restaurant/${eachObject.id}`}
            className="link"
            key={eachObject.id}
            testid="restaurant-item"
          >
            <li key={eachObject.id} className="restaurant-details-item">
              <img
                src={eachObject.imageUrl}
                alt=""
                className="restaurant-image"
              />
              <div>
                <h1 className="restaurant-name">{eachObject.name}</h1>
                <p className="food-type">{eachObject.cuisine}</p>
                <div className="rating-section">
                  <AiFillStar size={15} className="star-icon" />
                  <p className="rating">{eachObject.rating}</p>
                  <p className="reviews">({eachObject.totalReviews} Reviews)</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderInProgressView = () => (
    <div className="home-loader-container" testid="restaurants-list-loader">
      <Loader
        type="Oval"
        color="#F7931E"
        height="50"
        width="50"
        // strokeWidth={30}
        // ariaLabel="loading-indicator"
        // strokeWidthSecondary={30}
        // secondaryColor="white"
      />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case restaurantsDataApiStatusConstants.success:
        return this.renderSuccessView()
      case restaurantsDataApiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  onChangeSortBy = event => {
    this.setState({activeOptionId: event.target.value}, this.getRestaurantsData)
    console.log(event.target.value)
  }

  render() {
    const {activePage, totalPageCount, activeOptionId} = this.state
    return (
      <>
        <Header />
        <Carousel />
        <div className="popular-restaurants-container">
          <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
          <div className="text-sort-by-container">
            <p className="popular-restaurants-text">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-by-container">
              <BsFilterRight size={30} className="filter-icon" />
              <p className="sort-by-text">Sort by</p>
              <select
                onChange={this.onChangeSortBy}
                value={activeOptionId}
                className="options-container"
              >
                {sortByOptions.map(eachOption => (
                  <option
                    key={eachOption.id}
                    value={eachOption.value}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr className="line" />
        {this.renderView()}
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-button"
            onClick={this.onClickLeftArrow}
            testid="pagination-left-button"
          >
            <AiOutlineLeftSquare size={30} className="icon" />
          </button>
          <p className="active-page" testid="active-page-number">
            {activePage}
          </p>
          <span className="of-text">&nbsp;of&nbsp;</span>
          <p className="page-count">{totalPageCount}</p>
          <button
            type="button"
            className="pagination-button"
            onClick={this.onClickRightArrow}
            testid="pagination-right-button"
          >
            <AiOutlineRightSquare size={30} className="icon" />
          </button>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
