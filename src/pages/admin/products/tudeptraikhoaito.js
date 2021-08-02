import Sidebe from '../components/Sidebe'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
import { ParseURLUpdate } from '../utils';
import CategoryAPI from '../api/categoryAPI';
// import { API } from '../config';
// import { Link } from 'react-router-dom';
import ProductApi from '../api/productAPI';

const UpdataProduct = () => {
    window.scrollTo(0, 0);
    let id = ParseURLUpdate()
    let history = useHistory();
    const [categorys, setcategory] = useState([]);
    const [products, setproducts] = useState([]);
    useEffect(() => {
        const listtodo = async () => {
            try {
                let { data: category } = await CategoryAPI.getAll();
                let { data: product } = await ProductApi.get(id)
                setcategory(category.data)
                setproducts(product)
            } catch (error) {
                console.log(error)
            }
        }
        listtodo()
    }, [id]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)
    const onSubmit = (data, e) => {
        let newData = {}
        let newproduct = new FormData();
        if (data.photo[0] == undefined) {
            newData = {
                name: (data.name == "" ? products.name : data.name),
                price: (data.price == "" ? products.price : data.price),
                description: (data.description == "" ? products.description : data.description),
                category: (data.category == "" ? products.category : data.category),
            }
        } else {
            newData = {
                name: (data.name == "" ? products.name : data.name),
                price: (data.price == "" ? products.price : data.price),
                description: (data.description == "" ? products.description : data.description),
                category: (data.category == "" ? products.category : data.category),
                photo: (data.photo[0] == undefined ? products.photo : data.photo[0]),
            }
            newproduct.append("photo", newData.photo)
        }
        // console.log("data click", data)
        // console.log("newData", newData)
        newproduct.append("name", newData.name)
        newproduct.append("price", newData.price)
        newproduct.append("category", newData.category)
        newproduct.append("description", newData.description)
        newproduct.append("shipping", true)
        ProductApi.update(id, newproduct)
            .then(() => {
                history.push('/admin/listProduct');
                swal("", "Sửa thành công!", "success");
                e.target.reset();
                setError('');
                setSuccess(true)
            })
            .catch(error => {
                setError(error.response.data.error)
                setSuccess(false)
            })

    }
    const showError = () => {
        return (
            <>
                <h2 className="col-span-6  px-5 w-4/5 p-1 ml-40 text-red-500" style={{ display: error ? "block" : "none" }}>{error}<span className=" text-red-500 font-light">❌</span></h2>
            </>
        )
    }
    const showSucces = () => {
        return (
            <>
                <h2 className="col-span-6 px-5 w-4/5 p-1 ml-40 text-green-500" style={{ display: success ? "block" : "none" }}>Thêm thành công<span className=" text-green-500 font-light">✅</span></h2>
            </>
        )

    }
    return (
        <div className="pt-3">
            <div className=" grid grid-cols-5 gap-4">
                <Sidebe />
                <div className="col-span-4 " id="show">
                    <div className="bg-green-200 p-3">
                        <h4 className="font-black mx-32 p-1">Update product</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} id="form-add" className="mx-auto  pb-5 bg-blue-100  border-2 mt-3">
                        <div className="grid grid-cols-7">
                            {showError()}
                            {showSucces()}

                        </div>
                        <div className="grid grid-cols-7" >
                            <div className="col-span-4">
                                <div className="">
                                    <span className="mt-4 ml-16 ">Name  <span id="check-img" className="text-red-600 ml-2 font-extrabold">*</span></span>
                                    <input type="text"
                                        className="ml-12 border-2 px-5 p-1 mt-4 w-7/12 "
                                        id="name"
                                        name="name"
                                        placeholder="product name"
                                        defaultValue={products.name}
                                        {...register('name')}
                                    />
                                </div>
                                <div className="">
                                    <span className="mt-4 ml-16 ">Price  <span id="check-img" className="text-red-600 ml-2 font-extrabold">*</span></span>
                                    <input type="text"
                                        className=" ml-14 border-2 px-5 p-1 mt-2 w-7/12 "
                                        id="price"
                                        name="price"
                                        placeholder="price"
                                        defaultValue={products.price}
                                        {...register('price')}
                                    />
                                </div>
                                <div className="">
                                    <span className="mt-4 ml-16 ">Images <span id="check-img" className="text-red-600 ml-2 font-extrabold">*</span></span>
                                    <input type="file"
                                        className=" ml-9 p-1 mt-2"
                                        id="photo"
                                        name="photo"

                                        {...register('photo')}
                                    />
                                </div>



                                <div className="  mt-2">
                                    <span className=" ml-16 ">Category</span>
                                    <select name="category"
                                        className="ml-12 p-1 border-2"
                                        id="category"
                                        {...register('category')}
                                    >
                                        {categorys.map((showcate, index) => {
                                            if (showcate._id == products.category) {
                                                return (
                                                    <option key={index} value={showcate._id} selected>{showcate.name}</option>
                                                )
                                            } else {
                                                return (
                                                    <option key={index} value={showcate._id}>{showcate.name}</option>

                                                )

                                            }
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <img className="object-cover w-36 mt-4 h-44 " src={`http://localhost:4000/api/productList/image/${products._id}`} />

                            </div>
                        </div>
                        <div className="mt-1 grid grid-cols-7">
                            <span className="mt-4 ml-16 " id="check-dp">Description  <span className="text-red-600 ml-2 font-extrabold">*</span></span>
                            <textarea
                                name="product-description"

                                className="col-span-6 border-2 px-5 w-4/5 p-1 mt-4 h-40"
                                id="description" placeholder="description"
                                name="description"
                                defaultValue={products.description}

                                {...register('description')}
                            />
                        </div>
                        <div className="ml-24 mt-3">
                            <button type="submit" className="p-1 bg-green-400 hover:bg-green-300 rounded ml-20 pl-4 pr-4  ">
                                Add
                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdataProduct
