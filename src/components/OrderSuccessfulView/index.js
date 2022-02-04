import {Link} from 'react-router-dom'
import './index.css'

const OrderSuccessfulView = () => (
  <div className="order-successful-container">
    <img
      src="https://res.cloudinary.com/dfzg7dbem/image/upload/v1643971006/Vector_ejhppv.png"
      alt=""
      className="order-successful-image"
    />
    <h1 className="payment-successful-heading">Payment Successful</h1>
    <p className="thanks-text">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <Link to="/">
      <button type="button" className="redirection-button">
        Go To Home Page
      </button>
    </Link>
  </div>
)

export default OrderSuccessfulView
