import React, { useEffect, useState } from 'react';
import CategoryAPI from '../../api/categoryAPI';
import { ParseURL } from '../../utils';
import { NavLink, Link } from 'react-router-dom';
import ProductApi from '../../api/productAPI';

const CategoryDetail = () => {
    let idCate = ParseURL();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect( () => {
        try {
            const dataCate = CategoryAPI.getAll();
            dataCate.then( ({data: categories}) => setCategories(categories.categories))

            //get product by category
            const dataProduct = ProductApi.sameProduct(idCate);
            dataProduct.then( ({data}) => setProduct(data))
        } catch (error) {
            console.log(error)
        }
    }, [idCate])

    let showProduct;
    if(product !== []){
        showProduct = product.map( (item, index) => {
            return (
                <div className="col-4 pb-4" key={index}>
                    <div className="card  shadow h-100">
                        <Link to={`/product/${item._id}`} className="text-dark" >
                            <img src={`http://localhost:4000/api/product/image/${item._id}`} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                {/* <p className="card-text">Mo ta</p> */}
                                <p className="text-danger">{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                                
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })
    }else{
        showProduct = <h5 className="text-center">Danh mục này hiện đang hết sản phẩm.</h5>
    }
    return (
        <div>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-3">
                        <h3>Danh mục sản phẩm</h3>
                        <hr />
                        <ul className="list-group">
                            {categories.map( (item, index) => {
                                return <li className="list-group-item"  key={index} ><NavLink activeClassName="active2" className="text-decoration-none text-dark fw-bolder" to={`/category/${item._id}`}  >{item.name}</NavLink></li>
                            })}
                            
                        </ul>   
                    </div>
                    <div className="col-9">
                        <h3 className="text-center">
                            {categories.filter(item => item._id === idCate).map((namecate, index) => {
                                return (
                                    <span key={index}>{namecate.name}</span>
                                )
                            })}
                        </h3>
                        <hr />
                        <div className="row">
                            {showProduct}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CategoryDetail
