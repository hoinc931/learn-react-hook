import React, { useEffect, useState } from 'react';
import ProductApi from '../../api/productAPI';
import { ParseURL } from '../../utils';
import { Link } from 'react-router-dom';
import CategoryAPI from '../../api/categoryAPI';

const ProductDetail = () => {
  window.scrollTo(0, 0);
  const id = ParseURL();
  const [product, setProduct] = useState([])
  const [cateName, setCateName] = useState([])
  useEffect(()=>{
    try {
      const data = ProductApi.get(id);
      data.then( ({data: data}) => {
        setProduct(data)
        const dataCate = CategoryAPI.get(data.category)
        dataCate.then( ({data}) => {
          setCateName(data)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }, [id])
  let a = product.size;
  console.log(typeof a)
  return (
      <>
        <div className="container"> 
          <h6 className="text-left my-4"><a href="/" className="link-dark"><i className="fas fa-home" /> Trang chủ</a>  /   <Link to={`/category/${cateName._id}`} className="text-dark">{cateName.name}</Link>  /  {product.name}</h6>
          <hr />
          <div className="row">
            <div className="col-5" style={{objectFit: 'cover'}}>
              <img src={`http://localhost:4000/api/product/image/${product._id}`} width="90%" height="400px" alt={product.name} />
            </div>
            <div className="col-7 ps-5">
              <h1>{product.name}</h1>
              <p className="text-danger">Giá: {product.price}</p>
              <p>Color: {product.color}</p> 
              <p>Size: {product.size}</p>
              <div className="pay">
                <button className="btn btn-outline-secondary text-uppercase" style={{width: '200px'}}>Mua ngay</button>
                <button className="btn btn-outline-secondary text-uppercase" id="addCard" data-id="${product._id}" style={{width: '200px'}}>Thêm vào giỏ</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="detailProduct">
            <h2 className="text-uppercase text-center ">Chi tiết sản phẩm</h2>
            <p>{product.detail}</p>
          </div>
          <div className="sameProduct pt-5">
            <h2 className="text-uppercase ">Sản phẩm tương tự</h2>
            <hr />
            <div className="row">
              ${'{'}resultCate{'}'}
            </div>
          </div>
        </div>

      </>
  )
}

export default ProductDetail
