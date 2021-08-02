import React, { useEffect, useState } from 'react';
import ProductApi from '../../api/productAPI';
import { ParseURL } from '../../utils';
import { Link, useHistory, useParams } from 'react-router-dom';
import CategoryAPI from '../../api/categoryAPI';
import ColorAPI from '../../api/colorAPI';
import { useForm } from 'react-hook-form';

const ProductDetail = (props) => {
  window.scrollTo(0, 0);
  const id = ParseURL();
  const [product, setProduct] = useState([])
  const [sameProduct, setSameProduct] = useState([])
  const [cateName, setCateName] = useState([])
  const history = useHistory()
  //
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
   
  const { register, handleSubmit, formState: {errors} } = useForm();
  useEffect(()=>{
    try {
      const data = ProductApi.get(id);
      data.then( ({data: data}) => {
        setProduct(data)
        const dataCate = CategoryAPI.get(data.category)
          dataCate.then( ({data}) => {
          setCateName(data)
        })
        //get product by category
        const dataProduct = ProductApi.sameProduct(data.category);
        dataProduct.then( ({data}) => setSameProduct(data))
      })
      
      //.
      let dataColor = ColorAPI.get()
      dataColor.then( ({data: color}) => setColors(color.data))
      let dataSize = ColorAPI.getSize()
      dataSize.then( ({data: size}) => setSizes(size.data))
    } catch (error) {
      console.log(error)
    }
  }, [id])

  // const childCallBack = ( item ) => {
  //   console.log('hello parent', item)
  // }
  const onSubmit = (data) => {
    // create new data with _id
    const newData = [{
      _id: id,
      value: [
        {
          color: data.color,
          size: data.size,
          quantity: data.quantity
        }
      ]
    }]
    //fisrt, check authenticated
    const profile = localStorage.getItem('token')
    if(profile == null){
      alert('Please to sign in now.')
      history.push('/signin')
    }else{
      const {user} = JSON.parse(profile)
      if(user.role === 1){
        alert('Can not add this product to cart!')
      }else{
        // console.log(newData)
        // add to cart here.
        // get color, size and quantity
        // localStorage.setItem("cart", JSON.stringify(data))
        props.parentCallBack(newData)
      }
    }
    
  }

  if(product.size && product.color){
    let sizeId = product.size[0].split(',')
    let sized = []
    sizes.map( (item, index) => {
      return sizeId.map( items => { 
        if(items === item._id){
          return sized = [...sized, item]
        }else{
          return ''
        }
      })
    })
    let colorId = product.color[0].split(',')
    let colorChecked = []
    colors.map( (item, index) => {
      return colorId.map( items => { 
        if(items === item._id){
          return colorChecked = [...colorChecked, item]
        }else{
          return ''
        }
      })
    })
    return (
      <>
      <div className="container mt-2"> 
        <h6 className="text-left my-4"><a href="/" className="link-dark"><i className="fas fa-home" /> Trang chủ</a>  /   <Link to={`/category/${cateName._id}`} className="text-dark">{cateName.name}</Link>  /  {product.name}</h6>
        <hr />
        <div className="row">
          <div className="col-5" style={{objectFit: 'cover'}}>
            <img src={`http://localhost:4000/api/product/image/${product._id}`} width="90%" alt={product.name} />
          </div>

          {/* form card */}
          <form action="" className="col-7 ps-2" onSubmit={handleSubmit(onSubmit)}>
          <div >
            <h3>{product.name}</h3>
            <p className="text-danger">Giá: {product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
            <div className="d-flex row">
              <label htmlFor="" className="me-1">
                Color:
              </label>
                {colorChecked.map( item => {
                if(item){
                  return <div className="form-check form-switch me-3 col-2" key={item._id} >
                          <input className="form-check-input" type="radio" id={item._id} value={item._id} {...register('color')} />
                          <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                      </div>
                }else{
                  return ''
                }
              })}
            </div> 
            <div className="d-flex row">
              <label htmlFor="" className="me-1">Size:</label> 
              {sized.map(item => {
              if(item){
                return <div className="form-check form-switch me-3 col-2" key={item._id} >
                        <input className="form-check-input" type="radio" id={item._id} value={item._id} {...register('size')} />
                        <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                    </div>
              }else{
                return ''
              }
              })}
            </div>
            <p className="d-flex">
              <label htmlFor="quantity" className="me-1">Số lượng: </label>
              <input type="number" className="form-control w-25" id='quantity' defaultValue='1' {...register('quantity')} />
            </p>
            <div className="pay">
              {/* <button className="btn btn-outline-secondary text-uppercase mx-2" style={{width: '200px'}}>Mua ngay</button> */}
              <button className="btn btn-outline-secondary text-uppercase mx-2" id="addCard" type='submit' style={{width: '200px'}}>Thêm vào giỏ</button>
            </div>
          </div>
          </form>
          
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
            {sameProduct.map( item => {
              return <div className="col-4 pb-4" key={item._id}>
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
            })}
          </div>
        </div>
      </div>
      </>
    )
  }else{
    return ''
  }
  
}

export default ProductDetail
