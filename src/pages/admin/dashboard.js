import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductApi from '../../api/productAPI';
import CategoryAPI from '../../api/categoryAPI';
import ContactAPI from '../../api/contactAPI';
import AuthApi from '../../api/authApi';

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [contacts, setContacts] = useState([])
  const [users, setUsers] = useState([])

  useEffect( () => {
    try {
      const dataProducts = ProductApi.getAllAdmin();
      dataProducts.then( ( {data: products}) => setProducts(products.data))

      const dataCategories = CategoryAPI.getAll();
      dataCategories.then( ( {data: categories}) => setCategories(categories.categories))

      const dataContacts = ContactAPI.getAll()
      dataContacts.then( ( {data: contacts}) => setContacts(contacts.contacts))

      const dataUsers = AuthApi.getList()
      dataUsers.then( ( {data: user}) => setUsers(user.data))
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  return (
    <>
    <div className="container">
        <div className="row">
          <div className="four col-3 col-md-3">
            <div className="counter-box colored shadow-lg">  <span className="counter">{categories.length}</span>
              <p>Categories</p>
            </div>
          </div>
      
          <div className="four col-3 col-md-3">
            <div className="counter-box colored shadow-lg">  <span className="counter">{products.length}</span>
              <p>Products</p>
            </div>
          </div>
      
          <div className="four col-3 col-md-3">
            <div className="counter-box colored shadow-lg">  <span className="counter">{users.length}</span>
              <p>Users Register</p>
            </div>
          </div>
      
          <div className="four col-3 col-md-3">
            <div className="counter-box colored shadow-lg">  <span className="counter">{contacts.length}</span>
              <p>Contacts Send</p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard
