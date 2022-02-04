import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dfzg7dbem/image/upload/v1643972436/cooking_1_bukeq9.png"
      alt="empty cart"
      className="coffee-image"
    />
    <h1 className="no-orders-heading">No Order Yet!</h1>
    <p className="add-something-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-now-button">
        Order now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
