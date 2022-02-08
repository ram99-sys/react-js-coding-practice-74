import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

/*
const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
*/

class App extends Component {
  state = {toggler: false}

  openToggler = () => {
    this.setState({toggler: true})
  }

  closeToggler = () => {
    this.setState({toggler: false})
  }

  addCartItem = itemDetails => {
    const {cost, id, imageUrl, name, quantity} = itemDetails

    // update on local storage
    const storedData = JSON.parse(localStorage.getItem('cartData'))
    if (storedData === null) {
      const cartObject = {id, imageUrl, cost, name, quantity}
      localStorage.setItem('cartData', JSON.stringify([cartObject]))
    } else {
      const findObject = storedData.find(eachObject => eachObject.id === id)
      if (findObject === undefined) {
        const cartObject = {id, imageUrl, cost, name, quantity}
        storedData.push(cartObject)
        localStorage.setItem('cartData', JSON.stringify(storedData))
        // this.incrementItemQuantity(itemDetails)
      } else {
        this.incrementItemQuantity(itemDetails)
      }
    }
  }

  removeCartItem = (storedData, id) => {
    const updatedData = storedData.filter(eachObjectData => {
      if (eachObjectData.id === id) {
        return eachObjectData.id !== id
      }
      return eachObjectData
    })
    return updatedData
  }

  decreaseItemQuantity = (storedData, id) => {
    const updatedData = storedData.map(eachObjectData => {
      if (eachObjectData.quantity > 1) {
        if (eachObjectData.id === id) {
          const updatedQuantity = eachObjectData.quantity - 1
          return {...eachObjectData, quantity: updatedQuantity}
        }
        return eachObjectData
      }
      return eachObjectData
    })
    return updatedData
  }

  decrementItemQuantity = itemDetails => {
    const {id} = itemDetails

    // update quantity on local storage
    const storedData = JSON.parse(localStorage.getItem('cartData'))
    console.log(storedData)

    const findObject = storedData.find(eachObject => eachObject.id === id)
    if (findObject.quantity === 1) {
      const updatedData = this.removeCartItem(storedData, id)
      console.log(updatedData)
      localStorage.setItem('cartData', JSON.stringify(updatedData))
    } else {
      const updatedData = this.decreaseItemQuantity(storedData, id)
      console.log(updatedData)
      localStorage.setItem('cartData', JSON.stringify(updatedData))
    }
  }

  incrementItemQuantity = itemDetails => {
    const {id} = itemDetails
    // update Quantity on local Storage
    const storedData = JSON.parse(localStorage.getItem('cartData'))
    // console.log(storedData)

    const updatedArray = storedData.map(eachObject => {
      if (eachObject.id === id) {
        const updatedQuantity = eachObject.quantity + 1
        return {...eachObject, quantity: updatedQuantity}
      }
      return eachObject
    })
    console.log(updatedArray)
    localStorage.setItem('cartData', JSON.stringify(updatedArray))
  }

  render() {
    const {toggler} = this.state

    return (
      <CartContext.Provider
        value={{
          toggler,
          openToggler: this.openToggler,
          closeToggler: this.closeToggler,
          addCartItem: this.addCartItem,
          decrementItemQuantity: this.decrementItemQuantity,
          incrementItemQuantity: this.incrementItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
