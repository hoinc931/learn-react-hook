import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { API } from '../../../config';


const CategoryAdd = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [error, setError] = useState("");
    const [status, setStatus] = useState(false);

    const {token, user} = JSON.parse(localStorage.getItem('token'))
    const create = (data) => {
        return fetch(`${API}/category/create/${user._id}`,{
            headers: { 'Authorization': 'Bearer ' + token},
            method: "POST",
            body: data
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    const onSubmit = (data, e) => {
        let addCate = new FormData();
        addCate.append('name', data.name)

        create(addCate)
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
            ✅ Create category successfully. <Link to='/admin/listcategory'>Xem danh sách</Link>
        </div>
    }
    
    return (
        <>
            <form id="formId" action="" method="post" onSubmit={handleSubmit(onSubmit)} enctypr="application/x-www-form-urlencoded" className="pt-3">
                <div className="">
                    <h2 className="" id="">Thêm mới danh mục</h2>
                    {showError()}
                    {showStatus()}
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name">Tên danh mục:</label>
                        <input type="text" id="name" className="form-control" {...register('name')} />
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

export default CategoryAdd;
