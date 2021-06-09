import React, { useEffect, useState } from 'react';
import CategoryAPI from '../../../api/categoryAPI';
import { Link } from 'react-router-dom';

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        const list = async () => {
          try {
            let { data : categories} = await CategoryAPI.getAll();
            setCategories(categories.categories)
          } catch (error) {
            console.log(error)
          }
        }
        list()
      }, [])
    const onRemove = async (id) => {
        let confirm = window.confirm("Are you sure to remove??");
        try {
            if(confirm === true){
                await CategoryAPI.remove(id)
                const newCategories = categories.filter(item => item._id !== id)
                setCategories(newCategories)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Quản trị danh mục</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <Link to="/admin/addcategory" className="btn btn-sm btn-success">
                    Thêm mới
                </Link>
                </div>
            </div>
            <h2>Danh sách danh mục</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Ngày tạo</th>
                        <th>Cập nhật</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map( ( item, index) => {
                        return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{ item.name }</td>
                            <td>{ item.createdAt }</td>
                            <td>{ item.updatedAt }</td>
                            <td>
                                <Link to={`/admin/category/update/${item._id}`}>
                                    <button className="btn btn-outline-info">Update</button>
                                </Link>
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

export default ListCategory;