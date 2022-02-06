import {Component} from 'react'
import Header from '../Header'
import CartItems from '../CartItems'
import EmptyCartView from '../EmptyCartView'
import Footer from '../Footer'
import OrderSuccessfulView from '../OrderSuccessfulView'
import './index.css'

class Cart extends Component {
  state = {cartItemsData: [], isOrderSubmitted: false, totalAmount: 0}

  componentDidMount() {
    const storedRestaurantItemsData = localStorage.getItem('cartData')
    const parseStoredData = JSON.parse(storedRestaurantItemsData)
    console.log(parseStoredData)
    let total = 0
    if (parseStoredData !== null) {
      parseStoredData.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })
      console.log(total)
    }
    this.setState({cartItemsData: parseStoredData, totalAmount: total})
  }

  updateStatus = () => {
    const storedRestaurantItemsData = localStorage.getItem('cartData')
    const parseStoredData = JSON.parse(storedRestaurantItemsData)
    console.log(parseStoredData)
    let total = 0
    if (parseStoredData.length !== 0) {
      parseStoredData.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })
      console.log(total)
    }
    this.setState({cartItemsData: parseStoredData, totalAmount: total})
  }

  onClickShopNowButton = () => {
    this.setState({isOrderSubmitted: true})
    localStorage.clear('cartData')
  }

  renderCartView = () => {
    const {isOrderSubmitted, cartItemsData, totalAmount} = this.state

    return !isOrderSubmitted ? (
      <>
        <ul className="cart-items-container">
          <div className="cart-header">
            <p className="cart-value">Item</p>
            <p className="cart-value">Quantity</p>
            <p className="cart-value">Price</p>
          </div>
          <ul className="cart-items" testid="cartItem">
            {cartItemsData.map(eachObject => (
              <CartItems
                key={eachObject.id}
                cartItemDetails={eachObject}
                updateStatus={this.updateStatus}
              />
            ))}
          </ul>
          <hr className="hr-line" />
          <div className="submit-section">
            <div className="total-price-section">
              <h1 className="order-total">Order Total:</h1>
              <p className="total-price1" testid="total-price">
                ₹ {totalAmount}.00
              </p>
            </div>
            <button
              type="button"
              onClick={this.onClickShopNowButton}
              className="shop-now-button"
            >
              Place Order
            </button>
          </div>
        </ul>
        <Footer />
      </>
    ) : (
      <OrderSuccessfulView />
    )
  }

  renderView = () => {
    const {cartItemsData} = this.state
    if (cartItemsData.length !== 0) {
      return this.renderCartView()
    }
    return <EmptyCartView />
  }

  render() {
    const {cartItemsData} = this.state

    return (
      <>
        <Header />
        {cartItemsData === null ? <EmptyCartView /> : this.renderView()}
      </>
    )
  }
}

/*
  let total = 0
  parseStoredData.forEach(eachCartItem => {
    total += eachCartItem.cost * eachCartItem.quantity
  })
  console.log(total)
  */

export default Cart
