import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authenticate } from './auth';
import AuthApi from '../api/authApi';

const SignIn = (props) => {
    const history = useHistory();
    let user = localStorage.getItem('token')
    if(user != null){
        history.push('/')
    }
    document.title = "MIX Clothes - Đăng nhập";
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (dataInput) => {
        setLoading(true)
        try {
            const { data: response} = await AuthApi.signIn(dataInput)
            setError("");
            authenticate(response, () => {
                props.signIn(localStorage.getItem('token'))
                history.push('/')
            })
            
        } catch (error) {
            const {data} = error.response
            setError(data.error)
            setLoading(false)
        }
    }
    // const onSubmit = async (data) => {
    //     setLoading(true)
    //     signIn(data)
    //         .then(dataUser => {
    //             if(dataUser.error){
    //                 setError(dataUser.error)
    //                 setLoading(false)
    //             }else{
    //                 console.log(dataUser)
    //                 // authenticate(dataUser, () => {history.push('/')})
    //             }
    //         })
    // }
    
    const showError = () => {
        return <div className="alert alert-danger p-2" style={{display: error ? "block" : "none"}}>
            {error}
        </div>
    }
    const showLoading = () => {
        return loading && <div className="alert alert-success p-2" style={{display: loading ? "block" : "none"}}>
            Loading...
        </div>
    }
    const signInForm = () => {
        return (
            <form action="" onSubmit={handleSubmit(onSubmit)} method="post" encType="application/x-www-form-urlencoded">
                <div className="text-center">
                    <h2>Đăng nhập</h2>
                    {showError()}
                    {showLoading()}
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
                    Bạn chưa có tài khoản? <Link to="/signup">Tạo tài khoản mới.</Link>
                </div>
                <div className="text-center pt-3 pb-4">
                    <button type="submit" id="signInBtn" className="btn btn-outline-primary">Đăng nhập</button>
                </div>
            </form>
        )
    }
    return (
        <div className="container w-50 pt-5">
            {/* {signInForm()} */}
            <form action="" onSubmit={handleSubmit(onSubmit)} method="post" encType="application/x-www-form-urlencoded">
                <div className="text-center">
                    <h2>Đăng nhập</h2>
                    {showError()}
                    {showLoading()}
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
                    Bạn chưa có tài khoản? <Link to="/signup">Tạo tài khoản mới.</Link>
                </div>
                <div className="text-center pt-3 pb-4">
                    <button type="submit" id="signInBtn" className="btn btn-outline-primary">Đăng nhập</button>
                </div>
            </form>
        </div>

    )
}

export default SignIn
