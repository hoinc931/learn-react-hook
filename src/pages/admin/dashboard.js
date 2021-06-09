import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()
  const onSubmit = (data, e) => {
    console.log(data)
  }
  const formSelect = () => {
    return (
      <form id="formId" action="" method="post" onSubmit={handleSubmit(onSubmit)} enctypr="application/x-www-form-urlencoded" className="pt-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="1" value="1" {...register('size')} defaultChecked />
          <label className="form-check-label" htmlFor="1">1</label>
        </div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="2" value="2" {...register('size')} defaultChecked />
          <label className="form-check-label" htmlFor="2">2</label>
        </div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="3" value="3" {...register('size')} defaultChecked />
          <label className="form-check-label" htmlFor="3">3</label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">submit</button>
        </div>
      </form>
    )
  }
  return (
    <>
      This is Dashboard Page.
      {formSelect()}
    </>
  )
}

export default Dashboard
