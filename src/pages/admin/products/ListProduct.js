import React, { useEffect, useState } from 'react';
import ProductApi from '../../../api/productAPI'
import { Link } from 'react-router-dom';
import { API } from '../../../config';
import CategoryAPI from '../../../api/categoryAPI';
import ColorAPI from '../../../api/colorAPI';

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [cate, setCate] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    useEffect(()=>{
      const list = async () => {
        try {
          let { data : products } = await ProductApi.getAllAdmin();
          let { data: categories } = await CategoryAPI.getAll();
          let {data: color} = await ColorAPI.get()
          let {data: size} = await ColorAPI.getSize()

          setColors(color.data)
          setSizes(size.data)
          setCate(categories.categories)
          setProducts(products.data)
        } catch (error) {
          console.log(error)
        }
      }
      list()
    }, [])
    const onRemove = (id) => {
      let confirm = window.confirm("Are you sure to remove??");
      try {
        if(confirm === true){
          ProductApi.remove(id)
          const newProducts = products.filter(item => item._id !== id)
          setProducts(newProducts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <><div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Quản trị sản phẩm</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="px-3">
              <Link to="/admin/colorlist" className="btn btn-sm btn-success">
                Quản lí màu
              </Link>
            </div>
            
            <div className="px-3">
              <Link to="/admin/sizelist" className="btn btn-sm btn-success">
                Quản lí kích cỡ
              </Link>
            </div>
            
            <div className="px-3">
              <Link to="/admin/addproduct" className="btn btn-sm btn-success">
                Thêm mới sản phẩm
              </Link>
            </div>
            
          </div>
        </div>
        <h2>Danh sách sản phẩm</h2>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Price</th>
                <th>Size</th>
                <th>Color</th>
                <th>Detail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map( ( item, index) => {
                let url = `${API}/product/image/${item._id}`;
                let cateName = cate.filter(value => value._id === item.category)
                let a = item.size[0].split(',').map( item => {
                  return sizes.filter( value => {
                    if(value._id == item){
                      return value.name
                    }
                  })
                })
                let c = item.color[0].split(',').map( item => {
                  return colors.filter( value => {
                    if(value._id == item){
                      return value.name
                    }
                  })
                })
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{ item.name }</td>
                    <td>{cateName[0].name}</td>
                    <td><img src={url} alt="" style={{height: '120px'}}/></td>
                    <td>{ item.price } VND</td>
                    <td>{ a.map(item => item[0].name ).join(', ') }</td>
                    <td>{ c.map(item => item[0].name ).join(', ') }</td>
                    <td>{ item.detail }</td>
                    <td>
                      <Link to={`/admin/product/update/${item._id}`}><button className="btn btn-outline-info">Update</button></Link>
                      <button className="btn btn-outline-danger" onClick={() => onRemove(item._id)}>Remove</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    )
}

export default ListProduct;