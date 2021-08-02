import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthApi from '../api/authApi';
// import { signUp } from './auth';

const SignUp = () => {
    const history = useHistory()
    let user = localStorage.getItem('token')
    if(user != undefined){
        history.push('/')
    }
    window.scrollTo(0, 0);

    document.title = "MIX Clothes - Đăng ký tài khoản";
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [error, setError] = useState("");
    const [status, setStatus] = useState(false);
    const onSubmit = async (dataInput, e) => {
        try {
            await AuthApi.signUp(dataInput)
            e.target.reset()
            setError("");
            setStatus(true)
            
        } catch (error) {
            const {data} = error.response
            setError(data.error )
            setStatus(false)
        }
    }
    // const onSubmit = async (data, e) => {
    //     signUp(data)
    //         .then(dataInput => {
    //             if(dataInput.error){
    //                 setError(dataInput.error )
    //                 setStatus(false)
    //             }else{
    //                 e.target.reset()
    //                 setError("");
    //                 setStatus(true)
    //             }
    //         })
    // }
    const showError = () => {
        return <div className="alert alert-danger p-2" style={{display: error ? "block" : "none"}}>
            ❌ {error}
        </div>
    }
    const showStatus = () => {
        return <div className="alert alert-success p-2" style={{display: status ? "block" : "none"}}>
            ✅ Create account successfully. <Link to="/signin">Đăng nhập ngay</Link>
        </div>
    }
    const signUpForm = () => {
        return (
            <form action="" onSubmit={handleSubmit(onSubmit)} method="post" encType="application/x-www-form-urlencoded">
                <div className="text-center">
                    <h2>Đăng ký tài khoản mới</h2>
                    {showError()}
                    {showStatus()}
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="name">Họ và tên: </label>
                    <input type="text" 
                        id="name" 
                        placeholder="Nhập tên của bạn..." 
                        className="form-control" 
                        {...register('name')} />
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="email">Email: </label>
                    <input type="email"
                        id="email" 
                        placeholder="Nhập email..." 
                        className="form-control" 
                        {...register('email')} />
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="password">Mật khẩu: </label>
                    <input type="password"
                        id="password" 
                        placeholder="Nhập mật khẩu..." 
                        className="form-control" 
                        {...register('password')} />
                </div>
                <div className="text-center pt-3">
                    Bạn đã có tài khoản? <Link to="/signin">Đăng nhập ngay</Link>
                </div>
                <div className="text-center pt-3 pb-4">
                    <button type="reset" className="btn btn-outline-secondary me-5">Nhập lại</button>
                    <button type="submit" id="signUpBtn" className="btn btn-outline-primary">Đăng ký</button>
                </div>
            </form>
        )
    }
    return (
        <div className="container w-50 pt-5">
            {signUpForm()}
        </div>
    )
}

export default SignUp
