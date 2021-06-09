import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { API } from '../../../config';

const AddColor = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [error, setError] = useState("");
    const [status, setStatus] = useState(false);

    const create = (data) => {
        return fetch(`${API}/color`,{
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    const onSubmit = (data, e) => {
        create(data)
            .then(output => {
                console.log(output)
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
            ✅ Create color successfully. <Link to='/admin/colorlist'>Xem danh sách</Link>
        </div>
    }
    return (
        <>
            <form id="formId" action="" method="post" onSubmit={handleSubmit(onSubmit)} enctypr="application/x-www-form-urlencoded" className="pt-3">
                <div className="">
                    <h2 className="" id="">Thêm mới màu</h2>
                    {showError()}
                    {showStatus()}
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name">Tên màu:</label>
                        <input type="text" id="name" className="form-control" {...register('name')} />
                    </div>
                </div>
                <div className="modal-footer">
                    <Link to="/admin/colorlist"><button type="button" className="btn btn-secondary">Hủy</button></Link>
                    <button type="submit" className="btn btn-primary" id="add">Thêm</button>
                </div>
            </form>
        </>
    )
}

export default AddColor
