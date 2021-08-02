import React, { useEffect, useState } from 'react'
import ContactAPI from '../../api/contactAPI';
import { Link } from 'react-router-dom';

const ContactList = () => {
    const [contacts, setContact] = useState([])

    useEffect( () => {
        try {
            const data = ContactAPI.getAll()
            data.then( ({data}) => setContact(data.contacts))

        } catch (error) {
            console.log(error)
        }
    }, [])

    const onRemove = (id) => {
        console.log(id)
    }
    return (
        <>
            <h2>Danh sách hỗ trợ</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Nội dung</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map( ( item, index) => {
                        return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{ item.title }</td>
                            <td>{ item.name }</td>
                            <td>{ item.phone }</td>
                            <td>{ item.email }</td>
                            <td>{ item.content }</td>
                            <td>
                                {/* <Link to={`/admin/category/update/${item._id}`}>
                                    <button className="btn btn-outline-info">Update</button>
                                </Link> */}
                                <button className="btn btn-outline-primary" onClick={() => onRemove(item._id)}>Status</button>
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

export default ContactList
