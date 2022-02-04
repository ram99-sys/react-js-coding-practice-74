import {Component} from 'react'
import {
  AiFillStar,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

class RestaurantItem extends Component {
  state = {isItemAdded: true, itemQuantity: 1}

  render() {
    const {restaurantItemDetails} = this.props
    const {imageUrl, cost, name, rating} = restaurantItemDetails
    const {isItemAdded, itemQuantity} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementItemQuantity,
            decrementItemQuantity,
          } = value

          // console.log(cartList)

          const onClickAddButton = async () => {
            this.setState({isItemAdded: false})
            await addCartItem(restaurantItemDetails)
          }

          const onClickIncreaseQuantity = async () => {
            await this.setState(prevState => ({
              itemQuantity: prevState.itemQuantity + 1,
            }))
            await incrementItemQuantity(restaurantItemDetails)
          }

          const onClickDecreaseQuantity = async () => {
            if (itemQuantity > 1) {
              await this.setState(prevState => ({
                itemQuantity: prevState.itemQuantity - 1,
              }))
            }
            if (itemQuantity === 1) {
              await this.setState({isItemAdded: true})
            }
            await decrementItemQuantity(restaurantItemDetails)
          }

          return (
            <li className="dishes-container" testid="foodItem">
              <img src={imageUrl} alt="" className="dish-image" />
              <div>
                <h1 className="dish-name">{name}</h1>
                <p className="dish-cost">
                  <span>&#8377;&nbsp;</span>
                  {cost}
                </p>
                <div className="icon-and-rating-section">
                  <AiFillStar size={15} className="dish-icon" />
                  <p className="dish-rating">{rating}</p>
                </div>
                {isItemAdded && (
                  <button
                    type="button"
                    className="add-button"
                    onClick={onClickAddButton}
                  >
                    ADD
                  </button>
                )}
                {!isItemAdded && (
                  <div className="quantity-section">
                    <button
                      type="button"
                      className="minus-button"
                      onClick={onClickDecreaseQuantity}
                      testid="decrement-count"
                    >
                      <AiOutlineMinusSquare size={20} className="minus-icon" />
                    </button>
                    <p className="quantity" testid="active-count">
                      {itemQuantity}
                    </p>
                    <button
                      type="button"
                      className="plus-button"
                      onClick={onClickIncreaseQuantity}
                      testid="increment-count"
                    >
                      <AiOutlinePlusSquare size={20} className="plus-icon" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default RestaurantItem
