import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import AuthApi from '../api/authApi'

const LayOutAdmin = (props) => {
  if(!localStorage.getItem('token')){
    return (
      <>
        <h1 className="text-danger text-center">Access Denied</h1>
        <Link to="/" className="d-block text-auto mx-auto">Trở lại an toàn.</Link>
      </>
    )
  }else{
    const {user} = JSON.parse(localStorage.getItem('token'))
    
    if(user.role !== 1){
      return (
        <>
          <h1 className="text-danger text-center">Access Denied</h1>
          <Link to="/" className="d-block text-auto mx-auto">Trở lại an toàn.</Link>
        </>
      )
    }else{
      return (
        <>
          <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <NavLink className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/admin/dashboard">MIX Clothes</NavLink>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <input className="form-control form-control-dark w-50" type="text" placeholder="Search" aria-label="Search" />
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap">
                <NavLink className="nav-link" to="/">Back Client</NavLink>
              </li>
            </ul>
          </header>
          <div className="container-fluid">
            <div className="row">
              <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <NavLink exact className="nav-link link-side-bar text-dark" activeClassName="active2" aria-current="page" to="/admin/dashboard">
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link link-side-bar text-dark" activeClassName="active2" to="/admin/listproducts">
                        Products
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link link-side-bar text-dark" activeClassName="active2" to="/admin/listcategory">
                        Categories
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link link-side-bar text-dark" activeClassName="active2" to="/admin/contact">
                        Contacts
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link link-side-bar text-dark" activeClassName="active2" to="/admin/listusers">
                        Users
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
              <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" >
                {props.children}
              </main>
            </div>
          </div>
        </>
      )
    }
  }
}

export default LayOutAdmin
