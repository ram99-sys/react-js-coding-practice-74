import {Component} from 'react'
import Header from '../Header'
import CartItems from '../CartItems'
import EmptyCartView from '../EmptyCartView'
import './index.css'

class Cart extends Component {
  state = {cartItemsData: []}

  componentDidMount() {
    const storedRestaurantItemsData = localStorage.getItem('cartItem')
    const parseStoredData = JSON.parse(storedRestaurantItemsData)
    console.log(parseStoredData)
    this.setState({cartItemsData: parseStoredData})
  }

  updateStatus = () => {
    const storedRestaurantItemsData = localStorage.getItem('cartItem')
    const parseStoredData = JSON.parse(storedRestaurantItemsData)
    console.log(parseStoredData)
    this.setState({cartItemsData: parseStoredData})
  }

  render() {
    const {cartItemsData} = this.state

    return (
      <div>
        <Header />
        {cartItemsData === null ? (
          <EmptyCartView />
        ) : (
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
                {}.00
              </p>
            </div>
          </div>
        )}
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
