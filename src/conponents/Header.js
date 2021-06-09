import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthApi from '../api/authApi';
import CategoryAPI from '../api/categoryAPI';

const Header = (props) => {
    const [categories, setCategories] = useState([]);
    const [userHTML, setUserHTML] = useState([])
    let infor = JSON.parse(localStorage.getItem('token'))
    useEffect( () => {
        if(infor){
            if(infor.user.role == 0){
                setUserHTML(
                    <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                        <li className=" px-0 mx-auto py-1">
                            <NavLink className="dropdown-item border border-dark rounded-3 text-center" to='/aaaaaaaaa' > Thông tin</NavLink>
                        </li>
                        <li className=" px-0 mx-auto py-1">
                            <p className="dropdown-item border border-dark rounded-3 text-center" onClick={()=>onSignOut()} >Đăng xuất <i className="fas fa-sign-in-alt" /></p>
                        </li>
                    </ul>
                )
            }else{
                setUserHTML(
                    <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                        <li className=" px-0 mx-auto py-1">
                            <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/admin/dashboard">Admin <i className="fas fa-sign-in-alt" /></NavLink>
                        </li>
                        <li className=" px-0 mx-auto py-1">
                            <p className="dropdown-item border border-dark rounded-3 text-center" onClick={()=>onSignOut()}>Đăng xuất <i className="fas fa-sign-in-alt" /></p>
                        </li>
                    </ul>
                )
            }
        }else{
            setUserHTML(
            <ul className="dropdown-menu px-2 mx-auto" aria-labelledby="dropdownMenuButton1">
                <li className=" px-0 mx-auto py-1">
                    <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/signin">Đăng nhập <i className="fas fa-sign-in-alt" /></NavLink>
                </li>
                <li className=" px-0 mx-auto py-1">
                    <NavLink className="dropdown-item border border-dark rounded-3 text-center" to="/signup">Đăng Ký <i className="fas fa-user-plus" /></NavLink>
                </li>
            </ul>)
        }
    }, [props.token])

    //signOut function
    const onSignOut = () => {
        let confirm = window.confirm("Are you sure to sign out???");
        if(confirm){
            localStorage.removeItem('token');
            AuthApi.signOut()
            props.signIn("")
        }
    }
    
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
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-sm-top shadow" id="header">
            <div className="container-fluid scroll">
                <div className="ps-5">
                    <NavLink className="navbar-brand pl-3" to="/">
                        <img src="./img/MIX.png" id="logoHeader" style={{maxHeight: '60px'}} alt="" />
                    </NavLink>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <NavLink className="nav-link text-dark "activeClassName="active1" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link text-dark dropdown-toggle"activeClassName="active1" to="/" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Sản phẩm</NavLink>
                            <ul className="dropdown-menu mt-0" aria-labelledby="dropdownMenuLink">
                                {categories.map( (value, index) => 
                                    (<li key={index} className="border-bottom p-0"><NavLink className="dropdown-item" to={`/category/${value._id}`}>{value.name}</NavLink></li>)
                                )}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark"activeClassName="active1" to="/about">Tin tức</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark"activeClassName="active1" to="/about">Giới thiệu</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark"activeClassName="active1" to="/contact">Liên hệ</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link text-dark"activeClassName="active1" to="/admin/dashboard">Admin</NavLink>
                        </li> */}
                    </ul>
                </div>
                <div className="pe-5 pt-3 d-flex">
                    <div className="dropdown mx-2 ">
                    <p className="link-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Tài Khoản <i className="fas fa-user" />
                    </p>
                    {userHTML}
                    </div>
                    <p id="cartDetails" data-bs-toggle="modal" data-bs-target="#detail-cart">Giỏ Hàng <i className="fas fa-shopping-cart"> </i>  <span className="total-cart-product badge bg-secondary">0</span></p>
                </div>
            </div>
        </nav>
        </>
        
    )
}

export default Header;
