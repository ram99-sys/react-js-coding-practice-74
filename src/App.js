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

const cartData = []

class App extends Component {
  state = {cartList: []}

  addCartItem = itemDetails => {
    const {cartList} = this.state
    const {cost, id, imageUrl, name, quantity} = itemDetails
    const data = {cost, id, imageUrl, name, quantity}
    const updatedData = [...cartList, data]
    this.setState({cartList: updatedData})

    // update on local storage
    const cartObject = {id, imageUrl, cost, name, quantity}
    cartData.push(cartObject)
    localStorage.setItem('cartItem', JSON.stringify(cartData))
  }

  decrementItemQuantity = itemDetails => {
    const {id} = itemDetails
    /*
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          if (eachItem.quantity > 1) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
        }
        return eachItem
      }),
    }))
    */

    // update quantity on local storage
    const storedData = JSON.parse(localStorage.getItem('cartItem'))
    console.log(storedData)

    const updatedData = storedData.map(eachObjectData => {
      if (eachObjectData.id === id) {
        if (eachObjectData.quantity > 1) {
          const updatedQuantity = eachObjectData.quantity - 1
          return {...eachObjectData, quantity: updatedQuantity}
        }
      }
      return eachObjectData
    })
    console.log(updatedData)
    localStorage.setItem('cartItem', JSON.stringify(updatedData))
  }

  incrementItemQuantity = itemDetails => {
    const {id} = itemDetails
    /*
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantity}
        }
        return eachItem
      }),
    }))
    */

    // update Quantity on local Storage
    const storedData = JSON.parse(localStorage.getItem('cartItem'))
    // console.log(storedData)

    const updatedArray = storedData.map(eachObject => {
      if (eachObject.id === id) {
        const updatedQuantity = eachObject.quantity + 1
        return {...eachObject, quantity: updatedQuantity}
      }
      return eachObject
    })
    console.log(updatedArray)
    localStorage.setItem('cartItem', JSON.stringify(updatedArray))
  }

  render() {
    const {cartList} = this.state
    //  console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
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
