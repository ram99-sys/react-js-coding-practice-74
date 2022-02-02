import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItems = props => {
  const {cartItemDetails} = props
  const {id, cost, imageUrl, quantity, name} = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {decrementItemQuantity, incrementItemQuantity} = value

        const onClickMinusButton = () => {
          decrementItemQuantity(cartItemDetails)
        }

        const onClickPlusButton = () => {
          incrementItemQuantity(cartItemDetails)
        }

        return (
          <div className="items-container1">
            <div className="image-and-name">
              <img src={imageUrl} alt="" className="cart-item-image" />
              <p className="dish-name1">{name}</p>
            </div>
            <div className="controls-container">
              <button
                type="button"
                className="minus-button1"
                onClick={onClickMinusButton}
              >
                <AiOutlineMinusSquare size={20} />
              </button>
              <p className="quantity-item">{quantity}</p>
              <button
                type="button"
                className="plus-button1"
                onClick={onClickPlusButton}
              >
                <AiOutlinePlusSquare size={20} />
              </button>
            </div>
            <p className="total-price">
              <span>&#8377;&nbsp;</span>
              {cost * quantity}.00
            </p>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItems
