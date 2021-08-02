import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthApi from '../api/authApi';
import CategoryAPI from '../api/categoryAPI';
import Logo from '../img/MIX.png'

const Header = (props) => {
    const [categories, setCategories] = useState([]);
    //signOut function
    const onSignOut = () => {
        let confirm = window.confirm("Are you sure to sign out???");
        if(confirm){
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            AuthApi.signOut()
            props.signIn("")
            setCartQuantity(0)
        }
    }
    
    // list category
    useEffect( () => {
        const listCategory = async () =>{
            try {
                const { data: response} = await CategoryAPI.getAll();
                setCategories(response.categories)
            } catch (error) {
                console.log(error)
            }
        }
        listCategory()
    }, [])

    //cart display
    // continue after App.js
    //cart
    let cart = localStorage.getItem('cart')
    cart = cart == null ? [] : JSON.parse(cart)
    const [cartQuantity, setCartQuantity] = useState(0);
    useEffect( () => {
        
        if(props.cartQuantity == 0 || props.cartQuantity == undefined){
            let cartLength = 0
            cart.map( item => cartLength += item.value.length)
            setCartQuantity(cartLength)
        }else{
            setCartQuantity(props.cartQuantity)
        }
        
    }, [props.cartQuantity])

    
    // set user html
    const [userHTML, setUserHTML] = useState([])
    let infor = JSON.parse(localStorage.getItem('token'))
    useEffect( () => {
        // signed in
        if(infor){
            // is user
            if(infor.user.role == 0){
                setUserHTML(
                    <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                        <li className=" px-0 mx-auto py-1">
                            <NavLink className="dropdown-item border border-dark rounded-3 text-center" to='/userinfor' > Thông tin</NavLink>
                        </li>
                        <li className=" px-0 mx-auto py-1">
                            <p className="dropdown-item border border-dark rounded-3 text-center" onClick={()=>onSignOut()} >Đăng xuất <i className="fas fa-sign-in-alt" /></p>
                        </li>
                    </ul>
                // <div className="pe-5 pt-3 d-flex">
                //     <div className="dropdown mx-2 ">
                //         <p className="link-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                //             Tài Khoản <i className="fas fa-user" />
                //         </p>
                //         <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                //             <li className=" px-0 mx-auto py-1">
                //                 <NavLink className="dropdown-item border border-dark rounded-3 text-center" to='/userinfor' > Thông tin</NavLink>
                //             </li>
                //             <li className=" px-0 mx-auto py-1">
                //                 <p className="dropdown-item border border-dark rounded-3 text-center" onClick={()=>onSignOut()} >Đăng xuất <i className="fas fa-sign-in-alt" /></p>
                //             </li>
                //         </ul>
                //     </div>
                //     <NavLink to="/cart" className="link-dark text-decoration-none" id="cartDetails" data-bs-toggle="modal" data-bs-target="#detail-cart">Giỏ Hàng <i className="fas fa-shopping-cart"> </i>  <span className="total-cart-product badge bg-secondary">{cartQuantity}</span></NavLink>
                // </div>
                )
            }else{
                // is admin
                setUserHTML(
                        <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                            <li className=" px-0 mx-auto py-1">
                                <NavLink className="dropdown-item border border-dark rounded-3 text-center" to='/admin/dashboard' >Admin</NavLink>
                            </li>
                            <li className=" px-0 mx-auto py-1">
                                <p className="dropdown-item border border-dark rounded-3 text-center" onClick={()=>onSignOut()} >Đăng xuất <i className="fas fa-sign-in-alt" /></p>
                            </li>
                        </ul>
                    // <div className="pe-5 pt-3 d-flex">
                    //     <div className="dropdown mx-2 ">
                    //         <p className="link-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    //             <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/admin/dashboard">Admin <i className="fas fa-user-shield"></i></NavLink>
                    //         </p>
                    //     </div>
                    //     <p className="dropdown-item border border-dark rounded-3 text-center" onClick={()=>onSignOut()}>Đăng xuất <i className="fas fa-sign-in-alt" /></p>
                    // </div>
                )
            }
        }else{
            //do not signed in
            setUserHTML(
                <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                    <li className=" px-0 mx-auto py-1">
                        <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/signin">Đăng nhập <i className="fas fa-sign-in-alt" /></NavLink>
                    </li>
                    <li className=" px-0 mx-auto py-1">
                        <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/signup">Đăng Ký <i className="fas fa-user-plus" /></NavLink>
                    </li>
                </ul>
            // <div className="pe-5 pt-3 d-flex">
            //     <div className="dropdown mx-2 ">
            //         <p className="link-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            //             Tài Khoản <i className="fas fa-user" />
            //         </p>
            //         <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
            //             <li className=" px-0 mx-auto py-1">
            //                 <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/signin">Đăng nhập <i className="fas fa-sign-in-alt" /></NavLink>
            //             </li>
            //             <li className=" px-0 mx-auto py-1">
            //                 <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/signup">Đăng Ký <i className="fas fa-user-plus" /></NavLink>
            //             </li>
            //         </ul>
            //     </div>
            //     <NavLink to="cart" className="link-dark text-decoration-none" id="cartDetails" data-bs-toggle="modal" data-bs-target="#detail-cart">Giỏ Hàng <i className="fas fa-shopping-cart"> </i>  <span className="total-cart-product badge bg-secondary">{cartQuantity}</span></NavLink>
            // </div>
            )
        }
    }, [props.token])
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-sm-top shadow" id="header">
            <div className="container-fluid scroll">
                <div className="ps-5">
                    <NavLink className="navbar-brand pl-3" to="/">
                        <img src={Logo} id="logoHeader" style={{maxHeight: '60px'}} alt="" />
                    </NavLink>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <NavLink className="nav-link text-dark " to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link text-dark dropdown-toggle" to="/" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Sản phẩm</NavLink>
                            <ul className="dropdown-menu mt-0" aria-labelledby="dropdownMenuLink">
                                {categories.map( (value, index) => 
                                    (<li key={index} className="border-bottom p-0"><NavLink className="dropdown-item" to={`/category/${value._id}`}>{value.name}</NavLink></li>)
                                )}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/about">Tin tức</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/about">Giới thiệu</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/contact">Liên hệ</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link text-dark"activeClassName="active1" to="/admin/dashboard">Admin</NavLink>
                        </li> */}
                    </ul>
                </div>
                <form className="d-flex me-4" style={ { height: '36px'}}>
                    <input className="form-control me-2" type="search" placeholder="Nhập tên sản phẩm,..." aria-label="Search"/>
                    <button className="btn btn-outline-dark" type="submit" style={{paddingRight: '10px',paddingLeft:'10px',width:'130px'}}>Tìm kiếm</button>
                </form>
                {/* {userHTML} */}
                <div className="pe-5 pt-3 d-flex">
                    <div className="dropdown mx-2 ">
                        <p className="link-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Tài Khoản <i className="fas fa-user" />
                        </p>
                        {userHTML}
                    </div>
                    <NavLink to="/cart" className="link-dark text-decoration-none" id="cartDetails" data-bs-toggle="modal" data-bs-target="#detail-cart">Giỏ Hàng <i className="fas fa-shopping-cart"> </i>  <span className="total-cart-product badge bg-secondary">{cartQuantity}</span></NavLink>
                </div>
            </div>
        </nav>
        </>
        
    )
}

export default Header;
