import React, { useEffect, useState } from 'react';
import { Link, useHistory, Redirect, useParams } from 'react-router-dom';
import ProductApi from '../api/productAPI';

const Cart = ( {products} ) => {
    window.scrollTo(0, 0)
    // check signed in
    const history = useHistory()
    let profile = localStorage.getItem('token')
    if(profile == null){
      history.push('/signin')
        // return <Redirect exact to="/signin" />
    }else{
        profile = JSON.parse(profile)
    }
    
    // get data from localStorage
    let cart = localStorage.getItem('cart');
    cart = cart == null ? '' : JSON.parse(cart);
    if(cart !== ''){
        let carted = []
        products.map( item => {
            return cart.map(item2 => {
                if(item2._id == item._id){
                    return carted = [...carted, {...item, quantity: item2.value[0].quantity}]
                }
            })
        })
        // a = a.filter(item => item !== undefined)
        console.log(carted)

    }
    const [cartsHtml, setCartsHtml] = useState('')
    useEffect( () => {
        if(cart == ''){
            setCartsHtml(
                <div className="container mt-2"> 
                    <h6 className="text-left my-4"><Link to="/" className="link-dark"><i className="fas fa-home" /> Trang chủ</Link>  / Giỏ hàng</h6>
                    <hr />
                    <h3 className="text-danger text-center">Giỏ hàng của bạn hiện trống. Vui lòng quay trở lại sau.</h3>
                </div>
            )
        }else{

            setCartsHtml(
                <div className="container mt-2"> 
                    <h6 className="text-left my-4"><Link to="/" className="link-dark"><i className="fas fa-home" /> Trang chủ</Link>  / Giỏ hàng</h6>
                    <hr />
                    <table className="table table-striped  mx-auto w-100">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {/* <tr key={index}>
                                <td>{index+=1}</td>
                                <td>
                                    <div className="d-flex">
                                        <div className="">
                                            <img style={{width: "80px"}} src={`http://localhost:4000/api/product/image/${getPro._id}`} alt=""/>
                                        </div>
                                        <div className="">
                                            <h4>{getPro.name} </h4>
                                            <label>size: . color{getPro}</label>
                                            <h4 className="text-danger">{getPro.price}</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <input type="number" className='form-control w-25' defaultValue='1' />
                                </td>
                                <td>1</td>
                                <td>
                                    <button className="btn btn-outline-danger">Xóa</button>
                                </td>
                            </tr> */}
                            
                        </tbody>
                    </table>
                </div>
            )
            
            
        }
    }, [])
    return cartsHtml
}

export default Cart
