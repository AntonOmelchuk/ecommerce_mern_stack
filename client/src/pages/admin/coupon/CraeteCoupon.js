import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import { DeleteOutlined } from '@ant-design/icons'
import 'react-datepicker/dist/react-datepicker.css'
import AdminNav from '../../../components/nav/AdminNav'
import LoadingTitle from '../../../components/LoadingTitle/LoadingTitle'

import { createCoupon, getCoupons, removeCoupon } from '../../../actions/coupon'

const CraeteCoupon = () => {
  const [couponValues, setCouponValue] = useState({ name: '', discount: '', expire: '' })
  const dispatch = useDispatch()
  const { general: { loading }, auth: { user }, coupons: { coupons } } = useSelector(state => state)

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createCoupon(user.token, couponValues))
    setCouponValue({ name: '', discount: '', expire: '' })
  }

  const handleRemove = id => dispatch(removeCoupon(user.token, id))

  useEffect(() => {
    dispatch(getCoupons())
  }, [])

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title='Coupon' />

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <lable name='name' className='text-muted'>Name</lable>
              <input
                name='name'
                type='text'
                className='form-control'
                value={couponValues.name}
                onChange={({ target }) => setCouponValue({ ...couponValues, name: target.value })}
                autoFocus
                required
              />
            </div>
            <div className='form-group'>
              <lable name='discount' className='text-muted'>Discount %</lable>
              <input
                name='discount'
                type='text'
                className='form-control'
                value={couponValues.discount}
                onChange={({ target }) => setCouponValue({ ...couponValues, discount: target.value })}
                required
              />
            </div>
            <div className='form-group'>
              <lable name='date-picker' className='text-muted'>Expire</lable>
              <br />
              <DatePicker
                name='date-picker'
                className='form-control'
                selected={new Date()}
                value={couponValues.expire}
                onChange={expire => setCouponValue({ ...couponValues, expire })}
                required
              />
            </div>
            <button
              type='submit'
              className='btn btn-outline-primary'
              disabled={loading}
            >
              Save

            </button>
          </form>

          <br />

          <table className='table table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Expire</th>
                <th scope='col'>Discount</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(({
                _id, name, discount, expire
              }) => (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{new Date(expire).toLocaleDateString()}</td>
                  <td>{`${discount}%`}</td>
                  <td>
                    <DeleteOutlined onClick={() => handleRemove(_id)} className='text-danger pointer' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CraeteCoupon
