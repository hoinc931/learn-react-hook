import React, { useEffect, useState } from 'react'
import AuthApi from '../../../api/authApi';

const ListUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        const list = async () => {
          try {
            const { data: data } = await AuthApi.getList();
            setUsers(data.data)
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
            await AuthApi.remove(id)
            const newList = users.filter(item => item._id !== id)
            setUsers(newList)
          }
        } catch (error) {
          console.log(error)
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Quản trị tài khoản</h1>
                {/* <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/admin/addproduct" className="btn btn-sm btn-success">
                    Thêm mới
                    </Link>
                </div> */}
            </div>
            <h2>Danh sách tài khoản</h2>
            <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Role</th>
                    <></>
                </tr>
                </thead>
                <tbody>
                {users.map( ( item, index) => {
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{ item.name }</td>
                        <td>{ item.email }</td>
                        <td>{ item.phone == undefined ? "No Information" : item.phone }</td>
                        <td>{ item.address == undefined ? "No Information" : item.address }</td>
                        <td>{ item.role == 0 ? "Khách" : "Admin"}</td>
                        <td>
                        <button className="btn btn-outline-info">Update</button>
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

export default ListUser
