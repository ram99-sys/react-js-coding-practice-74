import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

class CartItems extends Component {
  render() {
    const {cartItemDetails, updateStatus} = this.props
    const {cost, imageUrl, quantity, name} = cartItemDetails

    return (
      <CartContext.Consumer>
        {value => {
          const {decrementItemQuantity, incrementItemQuantity} = value

          const onClickMinusButton = () => {
            decrementItemQuantity(cartItemDetails)
            updateStatus()
          }

          const onClickPlusButton = () => {
            incrementItemQuantity(cartItemDetails)
            updateStatus()
          }

          return (
            <li className="items-container1">
              <div className="image-and-name">
                <img src={imageUrl} alt="" className="cart-item-image" />
                <h1 className="dish-name1">{name}</h1>
              </div>
              <div className="controls-container">
                <button
                  type="button"
                  className="minus-button1"
                  onClick={onClickMinusButton}
                  testid="decrement-quantity"
                >
                  <AiOutlineMinusSquare size={20} />
                </button>
                <p className="quantity-item" testid="item-quantity">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="plus-button1"
                  onClick={onClickPlusButton}
                  testid="increment-quantity"
                >
                  <AiOutlinePlusSquare size={20} />
                </button>
              </div>
              <p className="total-order-price">₹ {cost * quantity}.00</p>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartItems
