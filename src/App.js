import './App.css';
import Routers from './routers';
import React, { useState, useEffect } from 'react';
import ProductApi from './api/productAPI'
import CategoryAPI from './api/categoryAPI';

function App() {
  const [products, setproducts] = useState([]);
  
  useEffect(()=>{
    const listtodo = async () => {
      try {
        let { data : products} = await ProductApi.getAllAdmin();
        setproducts(products.data)
      } catch (error) {
        console.log(error)
      }
    }
    listtodo()
  }, [])
  const onHandleRemove = async (id) =>{
    let confirm = window.confirm("Are you sure to remove??");

    try {
      if(confirm === true){
        await ProductApi.remove(id)
        const newproducts = products.filter(item => item._id !== id)
        setproducts(newproducts)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

//app
  const [token, setToken] = useState([])
  const onHandleSignIn = (data) => {
    setToken(data)
  }


  return (
    <div className="App">
      <Routers  signIn={onHandleSignIn} token={token} />
      {/* <Routers products={products} onRemove={onHandleRemove} onAdd={onHandleAdd} /> */}
    </div>
  );
}

export default App;
