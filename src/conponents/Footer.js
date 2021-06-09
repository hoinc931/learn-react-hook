import React from 'react'

const Footer = () => {
    return (
        <>
        <hr/>
        <div className="container" id="footer">
            <div className="row pb-2 bg-gray-300 text-center">
                <div className="col-4">
                <img src="./img/your-logo.png" width={180} alt="" />
                <div className="contact">
                    <p className="fw-border fs-3 text-center">Liên hệ</p>
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-square fa-3x" /></a>
                    <a href="https://www.instagram.com/"><i className="fab fa-instagram-square fa-3x" /></a>
                    <p>Điện thoại: 0981927129</p>
                    <p>Email: hongltaph10297@fpt.edu.vn</p>
                </div>
                </div>
                <div className="col-4">
                <p className="fw-border fs-3 text-center">Giới thiệu</p>
                <ul className="list-group">
                    <li className="list-group-item border-0">Về chúng tôi</li>
                    <li className="list-group-item border-0">Hướng dẫn đặt hàng</li>
                    <li className="list-group-item border-0">Hotline: 0981927129</li>
                    <li className="list-group-item border-0">Hệ thống cửa hàng</li>
                </ul>
                </div>
                <div className="col-4">
                <p className="fw-border fs-3 text-center">Hỗ trợ</p>
                <ul className="list-group">
                    <li className="list-group-item border-0">Liên hệ shop</li>
                    <li className="list-group-item border-0">Chính sách đổi trả và bảo hành</li>
                    <li className="list-group-item border-0">Chính sách giao hàng</li>
                    <li className="list-group-item border-0">Chính sách bảo mật</li>
                </ul>
                </div>
            </div>
            <hr />
            <div className="text-center pb-4">
                Bản quyền © 2021 MIX Clothes.
            </div>
        </div>
        </>
    )
}

export default Footer
