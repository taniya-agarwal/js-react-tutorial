import React, { Component } from 'react';
import Product from './components/Product';
import ViewCart from './components/ViewCart';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCartOpen: false,
      cart: {},
      products: [
        {
          id: 111,
          name: 'Laptop',
          price: 198000,
          description: 'New Mac pro',
          canBuy: true,
          image: 'images/Laptop.png'
        },
        {
          id: 222,
          name: 'Mobile',
          price: 47000,
          description: 'New iphone 7',
          canBuy: true,
          image: 'images/Mobile.png'
        }
      ]
    };
  }
  toggleCart() {
    let { isCartOpen } = this.state;
    isCartOpen = !isCartOpen;
    this.setState({ isCartOpen });
  }
  addToCart(item, qty) {
    let id = item.id;
    let { cart } = this.state;
    let line;
    if (!cart[id]) {
      line = {
        [id]: { item, qty }
      }
    } else {
      line = cart[id];
      line = Object.assign({}, line, { qty: line.qty + qty })
      line = { [id]: line }
    }
    cart = Object.assign({}, cart, line)
    this.setState({ cart })
  }
  renderProducts() {
    let { products, cart, isCartOpen } = this.state;
    if (!isCartOpen) {
      return products.map((product, idx) => {
        return <Product onBuy={(item, qty) => this.addToCart(item, qty)} product={product} key={idx} />
      })
    } else {
      return <ViewCart cart={cart} />
    }
  }
  render() {
    let { cart, isCartOpen } = this.state;
    let itemsCount = Object.keys(cart).length;
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-primary">
          <a className="navbar-brand">shopIT</a>
        </nav>
        <hr />
        <i className="fa fa-shopping-cart"></i> {itemsCount} item(s) in cart
        |
        <a className="btn btn-link" onClick={e => this.toggleCart()}>{isCartOpen ? 'View products' : 'View cart'} </a>
        <hr />
        <div className="list-group">
          {this.renderProducts()}
        </div>
      </div>
    );
  }
}

export default App;
