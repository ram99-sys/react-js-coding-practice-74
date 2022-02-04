import {Component} from 'react'
import Header from '../Header'
import CartItems from '../CartItems'
import EmptyCartView from '../EmptyCartView'
import './index.css'

class Cart extends Component {
  state = {cartItemsData: [], isOrderSubmitted: false, totalAmount: 0}

  componentDidMount() {
    const storedRestaurantItemsData = localStorage.getItem('cartItem')
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
    const storedRestaurantItemsData = localStorage.getItem('cartItem')
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
  }

  render() {
    const {cartItemsData, isOrderSubmitted, totalAmount} = this.state

    return (
      <div>
        <Header />
        {cartItemsData === null ? (
          <EmptyCartView />
        ) : (
          !isOrderSubmitted && (
            <div className="cart-items-container">
              <div className="cart-header">
                <p className="cart-value">Item</p>
                <p className="cart-value">Quantity</p>
                <p className="cart-value">Price</p>
              </div>
              <div className="cart-items">
                {cartItemsData.map(eachObject => (
                  <CartItems
                    key={eachObject.id}
                    cartItemDetails={eachObject}
                    updateStatus={this.updateStatus}
                  />
                ))}
              </div>
              <hr className="hr-line" />
              <div className="total-price-section">
                <h1 className="order-total">Order Total:</h1>
                <p className="total-price1">
                  <span>&#8377;&nbsp;</span>
                  {totalAmount}.00
                </p>
              </div>
              <div className="button-section">
                <button type="button" onClick={this.onClickShopNowButton}>
                  Shop Now
                </button>
              </div>
            </div>
          )
        )}
        {isOrderSubmitted && <h1>Hello world</h1>}
      </div>
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
