import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import CategoryAPI from '../../../api/categoryAPI';
import ColorAPI from '../../../api/colorAPI';
import ProductApi from '../../../api/productAPI';
import { API } from '../../../config';
import { ParseURLAdmin } from '../../../utils';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const UpdateProduct = () => {
    const history = useHistory();
    //call api
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const id = ParseURLAdmin(); //lấy id từ url
    useEffect(() => {
        try {
            const dataPro = ProductApi.get(id);// axios api => return Promise<pending>
            dataPro.then(({data: dataOutput}) => {
                setProduct(dataOutput) // then để set lại data vào state
                })
            const dataCate = CategoryAPI.getAll();// axios api => return Promise<pending>
            dataCate.then( ({data: categories}) => {
                setCategories(categories.categories)
            })
            let dataColor = ColorAPI.get()
            dataColor.then( ({data: color}) => setColors(color))
            let dataSize = ColorAPI.getSize()
            dataSize.then( ({data: size}) => setSizes(size.data))
            
        } catch (error) {
            console.log(error)
        }
    }, [id])
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [error, setError] = useState("");

    const update = (data) => {
        return fetch(`${API}/productAdd/create`,{
            method: "POST",
            body: data
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    const onSubmit = (data, e) => {
        console.log(data)
        // if(data.category === "0"){
        //     setError("Vui lòng chọn danh mục!");
        //     setStatus(false)
        // }else{
        //     let addPro = new FormData();
        //     addPro.append('name', data.name)
        //     addPro.append('category', data.category)
        //     // addPro.append('description', data.description)
        //     addPro.append('detail', data.detail)
        //     addPro.append('price', data.price)
        //     // addPro.append('quantity', data.quantity)
        //     addPro.append('image', data.image[0])
        //     addPro.append('size', data.size)
        //     addPro.append('color', data.color)
    
        //     update(addPro)
        //         .then(output => {
        //             if(output.error){
        //                 setError(output.error )
        //                 setStatus(false)
        //             }else{
        //                 e.target.reset()
        //                 setError("");
        //                 setStatus(true)
        //             }
        //         })
        // }
    }

    const showError = () => {
        return <div className="alert alert-danger p-2" style={{display: error ? "block" : "none"}}>
            ❌ {error}
        </div>
    }
    if(product.size){
        let sizeId = product.size[0].split(',')
        //return string => split to an array => filter new array => map twice array
        let sized = []
        sizes.map( (item, index) => {
            return sizeId.map( items => { 
                if(items == item._id){
                    return sized = [...sized, item]
                }else{
                    return ''
                }
            })
        })
        let sizeUnChecked = [];
        sizes.map( (item, index) => {
            let a = []
            return sizeId.map( items => { 
                if(items != item._id){
                    return sizeUnChecked = [...sizeUnChecked, item]
                }else{
                    return ''
                }
            })
        })
        // console.log('size api', a)
        // console.log('ceh', sized)
        console.log(sizeUnChecked)
        return (
            <>
                <form id="formId" action="" method="post" onSubmit={handleSubmit(onSubmit)} enctypr="application/x-www-form-urlencoded" className="pt-3">
                    <div className="">
                        <h2 className="" id="">Thay đổi sản phẩm</h2>
                        {showError()}
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label htmlFor="name">Tên: </label>
                                <input type="text" id="name" className="form-control" defaultValue={product.name} {...register('name')} />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="price">Giá: </label>
                                <input type="number" id="price" className="form-control" defaultValue={product.price} {...register('price')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label htmlFor="addCate">Danh mục:</label>
                                <select className="form-select" {...register('category')} id="addCate" defaultValue={product.category}>
                                    <option value={0} disabled >Chọn danh mục</option>
                                    {categories.map( (item, index) => {
                                        if( item._id == product.category){
                                            return <option value={item._id} key={index} selected >{item.name}</option>
                                        }else{
                                            return <option value={item._id} key={index} >{item.name}</option>
                                        }
                                    })}
                                </select>
                            </div>
                            
                            <div className="col-6 form-group">
                                <label htmlFor="image">Ảnh: </label>
                                <input type="file" id="name" className="form-control" {...register('image')} />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="d-flex my-2 size">
                                <label htmlFor="">Kích cỡ: </label>
                                {sized.map( item => {
                                    if(item){
                                        return <div className="form-check form-switch mx-3">
                                                <input className="form-check-input" type="checkbox" id={item._id} value={item._id} {...register('size')} defaultChecked />
                                                <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                                            </div>
                                    }else{
                                        return ''
                                    }
                                })}
                                {/* {sizeUnChecked.map( item => {
                                    if(item != ''){
                                        return <div className="form-check form-switch mx-3">
                                                <input className="form-check-input" type="checkbox" id={item._id} value={item._id} {...register('size')} />
                                                <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                                            </div>
                                    }else{
                                        return ''
                                    }
                                })} */}
                                {/* <div className="form-check form-switch mx-3">
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
                                <div className="form-check form-switch mx-3">
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
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="detail">Chi tiết: </label>
                            <textarea id="detail" rows="5" className="form-control" {...register('detail')} ></textarea>
                        </div>
                        
                    </div>
                    <div className="modal-footer">
                        <Link to="/admin/listcategory"><button type="button" className="btn btn-secondary">Hủy</button></Link>
                        <button type="submit" className="btn btn-primary" id="add">Thay đổi</button>
                    </div>
                </form>
            </>
        )
    }else{ return ""}
    
}

export default UpdateProduct;
