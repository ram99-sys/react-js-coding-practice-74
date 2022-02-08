import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GoThreeBars} from 'react-icons/go'
import {RiCloseCircleFill} from 'react-icons/ri'
import CartContext from '../../context/CartContext'
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
      <CartContext.Consumer>
        {value => {
          const {openToggler, closeToggler, toggler} = value

          const onclickToggler = () => {
            openToggler()
          }

          const onClickCloseButton = () => {
            closeToggler()
          }

          return (
            <>
              <div className="header-container">
                <div className="website-logo-container">
                  <Link to="/" className="website-logo">
                    <img
                      src="https://res.cloudinary.com/dfzg7dbem/image/upload/v1643476740/Frame_274_qovatm.png"
                      alt="website logo"
                      className="website-logo1"
                    />
                    <h1 className="website-logo-heading">Tasty Kitchens</h1>
                  </Link>
                </div>
                <button
                  type="button"
                  className="toggler-button"
                  onClick={onclickToggler}
                >
                  <GoThreeBars size={30} />
                </button>
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
                      style={{
                        color: pathname === '/cart' ? '#f7931e' : '#334155',
                      }}
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
              {toggler && (
                <div className="sm-header-container">
                  <ul className="nav-links-container1">
                    <li>
                      <Link
                        to="/"
                        className="nav-link"
                        style={{
                          color: pathname === '/' ? '#f7931e' : '#334155',
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="nav-link"
                        style={{
                          color: pathname === '/cart' ? '#f7931e' : '#334155',
                        }}
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
                  <button
                    type="button"
                    className="close-icon"
                    onClick={onClickCloseButton}
                  >
                    <RiCloseCircleFill size={25} />
                  </button>
                </div>
              )}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Header)
