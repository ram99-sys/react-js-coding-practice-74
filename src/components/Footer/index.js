import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="image-and-logo-section">
        <img
          src="https://res.cloudinary.com/dfzg7dbem/image/upload/v1643476740/Frame_274_qovatm.png"
          alt=""
          className="footer-image"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-text">
        The only thing we are serious about is food.
      </p>
      <p className="footer-contact-us-text">Contact us on</p>
      <div className="icons-section">
        <FaPinterestSquare size={50} className="footer-icon" />
        <FaInstagram size={50} className="footer-icon" />
        <FaTwitter size={50} className="footer-icon" />
        <FaFacebookSquare size={50} className="footer-icon" />
      </div>
    </div>
  )
}
