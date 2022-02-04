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
          alt="website-footer-logo"
          className="footer-image"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-text">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="icons-section">
        <FaPinterestSquare
          size={50}
          className="footer-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram
          size={50}
          className="footer-icon"
          testid="instagram-social-icon"
        />
        <FaTwitter
          size={50}
          className="footer-icon"
          testid="twitter-social-icon"
        />
        <FaFacebookSquare
          size={50}
          className="footer-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
