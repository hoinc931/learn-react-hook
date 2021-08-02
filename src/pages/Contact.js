import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { API } from '../config';

const Contact = () => {
    document.title = "MIX Clothes - Liên hệ";
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [error, setError] = useState("");
    const [status, setStatus] = useState(false);

    const create = (data) => {
        return fetch("http://localhost:4000/api/contacts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    const onSubmit = async (data, e) => {
        await create(data)
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
            ✅ Thông tin hỗ trợ đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể, trân trọng. <Link to='/'>Mua sắm ngay</Link>
        </div>
    }

    // const khac = document.querySelector('#khac');
    // if(khac == )
    return (
        <div className="container contact mt-5">
            <div className="row">
                <div className="col-md-3">
                <div className="contact-info">
                    <h2>Liên hệ với chúng tôi</h2>
                    <h4>Hỗ trợ từ 8:00 – 20:00</h4>
                </div>
                </div>
                <div className="col-md-9">
                    {showError()}
                    {showStatus()}
                    <div className="contact-form">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label className="control-label" htmlFor="name">Tiêu đề:</label>
                                <div className="col-sm-10">          
                                    <input type="text" className="form-control" id="name" placeholder="Nhập tiêu đề cần hỗ trợ" {...register('title')} />
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <label className="control-label" htmlFor="problem">Vấn đề cần hỗ trợ:</label>
                                <div className="col-sm-10">          
                                    <select className="form-control" {...register('problem')}>
                                        <option value="0">Chọn vấn đề cần hỗ trợ</option>
                                        <option>Về sản phẩm</option>
                                        <option>Hỗ trợ khách hàng</option>
                                        <option>Giao hàng</option>
                                        <option id="khac">Khác: </option>

                                    </select>
                                </div>
                            </div> */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="name">Họ và Tên:</label>
                                <div className="col-sm-10">          
                                    <input type="text" className="form-control" id="name" placeholder="Nhập tên đầy đủ" {...register('name')} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="phone">Số điện thoại:</label>
                                <div className="col-sm-10">          
                                    <input type="number" className="form-control" id="phone" placeholder="Nhập số điện thoại" {...register('phone')} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="email">Email:</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="email" placeholder="Nhập email" {...register('email')} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="content">Nội dung:</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows={5} id="content" placeholder="Nội dung cần hỗ trợ" {...register('content')} />
                                </div>
                            </div>
                            <div className="form-group">        
                                <div className="col-sm-offset-2 col-sm-10 pt-3 text-center">
                                    <button type="submit" className="btn btn-primary px-3" id="send">Gửi</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
