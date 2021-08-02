import './App.css';
import Routers from './routers';
import React, { useState, useEffect } from 'react';
import ProductApi from './api/productAPI'
import CategoryAPI from './api/categoryAPI';
import Counter from './conponents/counter'

function App() {
  // get product
  const [products, setProducts] = useState([])
  useEffect( () => {
    try {
      let data = ProductApi.getAllAdmin()
      data.then( ({data: response}) => setProducts(response.data))
    } catch (error) {
      console.log(error)
    }
  }, [])
  //app
  const [token, setToken] = useState([])
  const onHandleSignIn = (data) => {
    setToken(data)
  }

  //cart on changes
  const [cartQuantity, setCartQuantity] = useState(0)

  //add to cart
  const parentCallBack = (data) => {
    let addData = data[0];
    //get data from storage
    let cart = localStorage.getItem("cart");
    // check data
    cart = cart == null ? [] : JSON.parse(cart);
    // get index of product
    let existed = cart.map(item => item._id).indexOf(addData._id)

    if(existed == -1){
      cart = [...cart, addData]
      localStorage.setItem('cart', JSON.stringify(cart))
    }else{
      // get index of color and size existed
      let attributed = cart[existed].value.map( (item, index) => {
        if(item.color == addData.value[0].color && item.size == addData.value[0].size){
          return index
        }
      }).join('')
      if(attributed != ''){
        cart[existed].value[attributed].quantity = Number(cart[existed].value[attributed].quantity) + Number(addData.value[0].quantity)
      }else{
        cart[existed].value = [...cart[existed].value, ...addData.value]
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    let cartLength = 0
    cart.map( item => cartLength += item.value.length)
    return setCartQuantity(cartLength)

    // return setCartQuantity(cart.length)
  }
  // redirect sign in
  // 1 hàm nhận dữ liệu là 
  return (
    <div className="App">
      <Routers products={products}  signIn={onHandleSignIn} token={token} parentCallBack={parentCallBack} cartQuantity={cartQuantity} />
      <Routers products={products} onRemove={onHandleRemove} onAdd={onHandleAdd} />
      {/* <Counter/> */}
    </div>
  );
}

export default App;
