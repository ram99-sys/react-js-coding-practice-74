import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', isFormSubmitted: false}

  onChangeUsername = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, isFormSubmitted: true})
  }

  submitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMessage, isFormSubmitted} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-and-image-container">
        <div className="login-container">
          <div className="form-container">
            <div className="image-text">
              <img
                src="https://res.cloudinary.com/dfzg7dbem/image/upload/v1643476740/Frame_274_qovatm.png"
                alt="website logo"
                className="tasty-kitchen-image"
              />
              <h1 className="tasty-kitchen-text">Tasty Kitchens</h1>
            </div>
            <h1 className="login-text">Login</h1>
            <form onSubmit={this.submitForm}>
              <div className="input-container">
                <label htmlFor="username" className="label-element">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-element"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label-element">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="input-element"
                  id="password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              {isFormSubmitted && (
                <p className="error-message">{errorMessage}</p>
              )}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dfzg7dbem/image/upload/v1643474405/Rectangle_1456_wewiig.png"
          alt="website login"
          className="tasty-kitchens-image1"
        />
      </div>
    )
  }
}
export default Login
