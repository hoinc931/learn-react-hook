import React, { useEffect, useState } from 'react'
import AuthApi from '../api/authApi';
import { useForm } from 'react-hook-form';


const UserInfor = () => {
    document.title = 'MIX - Clothes Thông tin tài khoản.';

    const [userInfo, setUserInfo] = useState([])
    const { token, user } = JSON.parse(localStorage.getItem('token'))
    useEffect( () => {
        try {
            const dataUser = AuthApi.getUser(user._id)
            dataUser.then( ({data: user}) => setUserInfo(user))

        } catch (error) {
            console.log(error)
        }
    }, [])

    const { register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <form className='' onSubmit={handleSubmit(onSubmit)} >
            <div className="text-center mt-4">
                <h2>Thông tin tài khoản</h2>
            </div>
            <table className='mx-auto w-50 my-0 mt-4'>
                <tr>
                    <th>Họ tên: </th>
                    <td><input type="text" className='form-control' defaultValue={userInfo.name} {...register('name')} /></td>
                </tr>
                <tr>
                    <th>Số điện thoại: </th>
                    <td><input type="text" className='form-control' defaultValue={userInfo.phone ? userInfo.phone : ''} {...register('phone')} /></td> 
                </tr>
                <tr>
                    <th>Email: </th>
                    <td><input type="email" disabled className='form-control' defaultValue={userInfo.email} /></td>
                </tr>
                <tr>
                    <th>Địa chỉ: </th>
                    <td><input type="text" className='form-control' defaultValue={userInfo.address ? userInfo.address : ''} {...register('address')} /></td>
                </tr>
                <tr>
                    <td><p className="btn btn-outline-warning mx-auto">Đổi mật khẩu</p></td>
                    <td><button className="btn btn-outline-primary mx-auto">Thay đổi</button></td>
                </tr>
            </table>

        </form>
    )
}

export default UserInfor
