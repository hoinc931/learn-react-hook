import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import ColorAPI from '../../../api/colorAPI';

const ColorList = () => {
    const [colorName, setColorName] = useState([])

    useEffect(()=>{
        try {
            let data = ColorAPI.get()
            data.then( ( {data} ) => setColorName(data.data))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const onRemove = (id) => {
        console.log(id)
        let confirm = window.confirm("Are you sure to remove??");
        try {
          if(confirm === true){
            ColorAPI.remove(id)
            const newProducts = colorName.filter(item => item._id !== id)
            setColorName(newProducts)
          }
        } catch (error) {
          console.log(error)
        }
      }
    return (
        <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Quản trị màu</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="px-3">
              <Link to="/admin/addcolor" className="btn btn-sm btn-success">
                Thêm mới
              </Link>
            </div>
            <div className="px-3">
              <Link to="/admin/listproducts" className="btn btn-sm btn-danger">
                Quay lại
              </Link>
            </div>
          </div>
        </div>
        <h2>Danh sách màu</h2>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Màu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {colorName.map( ( item, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{ item.name }</td>
                    <td>
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

export default ColorList
