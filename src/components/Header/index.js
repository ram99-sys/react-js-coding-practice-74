import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {location} = this.props
    const {pathname} = location
    // console.log(pathname)

    return (
      <div className="header-container">
        <div className="website-logo-container">
          <Link to="/" className="website-logo">
            <img
              src="https://res.cloudinary.com/dfzg7dbem/image/upload/v1643476740/Frame_274_qovatm.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-logo-heading">Tasty Kitchens</h1>
          </Link>
        </div>
        <ul className="nav-links-container">
          <li>
            <Link
              to="/"
              className="nav-link"
              style={{color: pathname === '/' ? '#f7931e' : '#334155'}}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="nav-link"
              style={{color: pathname === '/cart' ? '#f7931e' : '#334155'}}
            >
              Cart
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="nav-link logout-button"
              onClick={this.onClickLogoutButton}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Header)
