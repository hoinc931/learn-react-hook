import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductApi from '../api/productAPI'

const HomePage = () => {
    document.title = "MIX Clothes - Trang chủ";

    //get products form api
    const [products, setProducts] = useState([]);
    useEffect(() => {
        try {
            const data = ProductApi.getListLimit8();
            data.then( ({data : prods}) => {
                setProducts(prods.data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    

    return (
        <>
            <div>
                <div className="banner">
                    <img src="http://vraimode.com/media/catalog/category/banner_3.jpg" className="w-100 shadow" style={{maxHeight: '600px'}} alt="" />
                </div>
                <div className="container">
                    <h2 className="text-center mt-4">Sản phẩm mới</h2>
                    <hr />
                    <div className="card-group">
                        <div className="row mx-auto text-start">
                            {
                                products.map( (item, index) => {
                                    return (
                                        <div className="col-3 pb-4" key={index} >
                                            <Link to={ `/product/${item._id}` } style={{textDecoration: 'none', color: 'black'}}>
                                                <div className="card shadow h-100">
                                                    <img src={`http://localhost:4000/api/product/image/${item._id}`} className="card-img-top bd-placeholder-img" height="250px" style={{objectFit: 'cover'}} alt={item.name} />
                                                    <div className="card-body">
                                                        <h6 className="fs-6">{item.name}</h6>
                                                        <p className="text-danger">{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                                                        <p>{item.size}</p>
                                                        <p>{item.color}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="banner h-5 pt-4 px-0">
                    <img src="https://www.cunsieupham.com/wp-content/uploads/2015/12/banner-clothes-cunsieupham.com_.png" className="w-100 h-50" style={{maxHeight: '400px'}} alt="" />
                    <div className="container">
                        <div className="row border pt-4 shadow-sm">
                            <div className="col-4 text-center border-end">
                                <h2 style={{color: 'rgb(238, 65, 65)'}}><i className="fas fa-shipping-fast fa-2x" /></h2>
                                <p className="text-uppercase">Giao hàng toàn quốc</p>
                                <p>Vận chuyển khắp Việt Nam</p>
                            </div>
                            <div className="col-4 text-center border-end">
                                <h2 style={{color: 'rgb(238, 65, 65)'}}><i className="fas fa-wallet fa-2x" /></h2>
                                <p className="text-uppercase">Thanh toán khi nhận hàng</p>
                                <p>Nhận hàng tại nhà rồi thanh toán</p>
                            </div>
                            <div className="col-4 text-center">
                                <h2 style={{color: 'rgb(238, 65, 65)'}}><i className="fas fa-sync-alt fa-2x" /></h2>
                                <p className="text-uppercase">ĐỔI HÀNG DỄ DÀNG</p>
                                <p>Đổi hàng thoải mái trong 30 ngày</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;
