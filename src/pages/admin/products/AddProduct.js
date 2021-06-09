import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CategoryAPI from '../../../api/categoryAPI';
import ColorAPI from '../../../api/colorAPI';
import { API } from '../../../config';
/* 
    - Bước 1: Cài đặt react-hook-form: npm i react-hook-form --save
    - Bước 2: Imporrt { useForm } from 'react-hook-form'
    - Bước 3: Khai báo sử dụng : const { register, handleSubmit, formState: { errors }} = useForm();
    - Bước 4: Sử dụng: {...register('name', { required: true })}
*/

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }} = useForm();

    const [cate, setCate] = useState([])
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    useEffect(()=>{
        const list = async () => {
          try {
            let { data : categories} = await CategoryAPI.getAll();
            setCate(categories.categories)

            let {data: color} = await ColorAPI.get();
            setColor(color.data)

            let {data: size} = await ColorAPI.getSize()
            setSize(size.data)
          } catch (error) {
            console.log(error)
          }
        }
        list()
      }, [])
    
    const [error, setError] = useState("");
    const [status, setStatus] = useState(false);

    const create = (data) => {
        return fetch(`${API}/productAdd/create`,{
            method: "POST",
            body: data
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    const onSubmit = (data, e) => {
        let addPro = new FormData();
        addPro.append('name', data.name)
        addPro.append('category', data.category)
        // addPro.append('description', data.description)
        addPro.append('detail', data.detail)
        addPro.append('price', data.price)
        // addPro.append('quantity', data.quantity)
        addPro.append('image', data.image[0])
        addPro.append('size', data.size)
        // data.size.map(item => {
        //     addPro.append('size', item)
        // })
        addPro.append('color', data.color)
        console.log(addPro)
        create(addPro)
            .then(output => {
                if(output.error){
                    setError(output.error )
                    setStatus(false)
                }else{
                    e.target.reset()
                    setError("");
                    setStatus(true)
                }
            })
    }

    const showError = () => {
        return <div className="alert alert-danger p-2" style={{display: error ? "block" : "none"}}>
            ❌ {error}
        </div>
    }
    const showStatus = () => {
        return <div className="alert alert-success p-2" style={{display: status ? "block" : "none"}}>
            ✅ Create product successfully. <Link to='/admin/listproducts'>Xem danh sách</Link>
        </div>
    }
    return (
        <>
            <form id="formId" action="" method="post" onSubmit={handleSubmit(onSubmit)} enctypr="application/x-www-form-urlencoded" className="pt-3">
                <div className="">
                    <h2 className="" id="">Thêm mới sản phẩm</h2>
                    {showError()}
                    {showStatus()}
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="name">Tên: </label>
                            <input type="text" id="name" className="form-control" {...register('name')} />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="price">Giá: </label>
                            <input type="number" id="price" className="form-control" {...register('price')} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="addCate">Danh mục:</label>
                            <select className="form-select" {...register('category')} id="addCate">
                                <option value={0} >Chọn danh mục</option>
                                {cate.map( (item, index) => {
                                    return <option value={item._id} key={index} >{item.name}</option>
                                })}
                            </select>
                        </div>
                        {/* <div className="col-6 form-group">
                            <label htmlFor="quantity">Số lượng: </label>
                            <input type="text" id="quantity" className="form-control" {...register('quantity')} />
                        </div> */}
                        <div className="col-6 form-group">
                            <label htmlFor="image">Ảnh: </label>
                            <input type="file" id="image" className="form-control" {...register('image')} />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="d-flex my-2">
                            <label htmlFor="">Kích cỡ: </label>
                            {size.map( (item, index) => {
                                return <div className="form-check form-switch mx-3" key={index}>
                                            <input className="form-check-input" type="checkbox" id={item._id} value={item._id} {...register('size')}  />
                                            <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                                        </div>
                            })}
                            {/* <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="s" value="s" {...register('size')} defaultChecked />
                                <label className="form-check-label" htmlFor="s">S</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="m" value="m" {...register('size')} defaultChecked />
                                <label className="form-check-label" htmlFor="m">M</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="l" value="l" {...register('size')} defaultChecked />
                                <label className="form-check-label" htmlFor="l">L</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="xl" value="xl" {...register('size')} defaultChecked />
                                <label className="form-check-label" htmlFor="xl">XL</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="xxl" value="xxl" {...register('size')} defaultChecked />
                                <label className="form-check-label" htmlFor="xxl">XXL</label>
                            </div> */}
                        </div>
                        <div className="d-flex">
                            <label htmlFor="">Màu: </label>
                            {color.map( (item, index) => {
                                return <div className="form-check form-switch mx-3" key={index}>
                                            <input className="form-check-input" type="checkbox" id={item._id} value={item._id} {...register('color')}  />
                                            <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                                        </div>
                            })}
                            {/* <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="black" value="black" {...register('color')} defaultChecked />
                                <label className="form-check-label" htmlFor="black">Đen</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="white" value="white" {...register('color')} defaultChecked />
                                <label className="form-check-label" htmlFor="white">Trắng</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="yellow" value="yellow" {...register('color')} defaultChecked />
                                <label className="form-check-label" htmlFor="yellow">Vàng</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="red" value="red" {...register('color')} defaultChecked />
                                <label className="form-check-label" htmlFor="red">Đỏ</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="green" value="green" {...register('color')} defaultChecked />
                                <label className="form-check-label" htmlFor="green">Xanh lá</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="be" value="be" {...register('color')} defaultChecked />
                                <label className="form-check-label" htmlFor="be">Be</label>
                            </div>
                            <div className="form-check form-switch mx-3">
                                <input className="form-check-input" type="checkbox" id="pink" value="pink" {...register('color')} defaultChecked />
                                <label className="form-check-label" htmlFor="pink">Hồng</label>
                            </div> */}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="detail">Chi tiết: </label>
                        <textarea id="detail" rows="5" className="form-control" {...register('detail')} ></textarea>
                    </div>
                    
                </div>
                <div className="modal-footer">
                    <Link to="/admin/listcategory"><button type="button" className="btn btn-secondary">Hủy</button></Link>
                    <button type="submit" className="btn btn-primary" id="add">Thêm</button>
                </div>
            </form>
        </>
    )
}

export default AddProduct;
