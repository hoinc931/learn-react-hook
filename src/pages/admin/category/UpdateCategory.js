import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import CategoryAPI from '../../../api/categoryAPI';
import { API } from '../../../config';
import { ParseURLAdmin } from '../../../utils';

const UpdateCategory = () => {
    const history = useHistory()
    //call api
    const [cateName, setCateName] = useState([])
    const id = ParseURLAdmin(); //lấy id từ url
    useEffect(() => {
        try {
            const data = CategoryAPI.get(id);// axios api => return Promise<pending>
            data.then(({data: dataOutput}) => {
                setCateName(dataOutput) // then để set lại data vào state
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const { register, handleSubmit, formState: {errors} } = useForm();
    const [error, setError] = useState("");

    //get token
    const {user, token} = JSON.parse(localStorage.getItem('token'))
    const create = (data) => {
        return fetch(`${API}/category/${id}/${user._id}`,{
            headers: { 'Authorization': 'Bearer ' + token},
            method: "PUT",
            body: data
        })
        // return CategoryAPI.update(id, data)
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    const onSubmit = (data, e) => {
        let newData = (data.name == "" ? cateName : data);
        let newCate = new FormData();
        newCate.append('name', newData.name)

        create(newCate)
            .then(output => {
                if(output.error){
                    setError(output.error )
                }else{
                    setError("");
                    history.push('/admin/listcategory')
                }
            })
    }
    const showError = () => {
        return <div className="alert alert-danger p-2" style={{display: error ? "block" : "none"}}>
            ❌ {error}
        </div>
    }
    
    return (
        <>
            <form id="formId" action="" method="post" onSubmit={handleSubmit(onSubmit)} enctypr="application/x-www-form-urlencoded" className="pt-3">
                <div className="">
                    <h2 className="" id="">Cập nhật danh mục</h2>
                    {showError()}
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="nameInput">Tên danh mục:</label>
                        <input type="text" id="nameInput" defaultValue={cateName.name} className="form-control" {...register('name')} />
                    </div>
                </div>
                <div className="modal-footer">
                    <Link to="/admin/listcategory"><button type="button" className="btn btn-secondary">Hủy</button></Link>
                    <button type="submit" className="btn btn-primary" id="add">Thay đổi</button>
                </div>
            </form>
        </>
    )
}

export default UpdateCategory
 