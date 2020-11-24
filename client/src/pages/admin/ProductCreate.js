import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import AdminNav from '../../components/nav/AdminNav'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import ProductInput from './components/ProductInput'
import ProductSelect from './components/ProductSelect'
import MultipleSelect from '../../components/MultipleSelect.js/MultipleSelect'
import FileUpload from '../../components/FileUpload/FileUpload'

import { createProduct, getProducts } from '../../actions/product'
import { getAllCategories } from '../../actions/category'
import initialState from '../../constants/initialStates'
import { getCurrentCategorySubs } from '../../actions/sub'

const ProductCreate = () => {
  const [values, setValues] = useState(initialState)
  const [selectedValues, setSelectedValues] = useState({})

  const {
    general: { loading },
    auth: { user },
    category: { categories },
    sub: { categorySubs }
  } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getProducts())

    setValues(prev => ({ ...prev, category: [...categories.map(({ _id, name }) => ({ _id, name }))] }))
    setValues(prev => ({ ...prev, subs: [...categorySubs.map(({ _id, name }) => ({ _id, name }))] }))
  }, [dispatch, categorySubs])

  const handleSubmit = e => {
    e.preventDefault()
    const {
      title, description, price, quantity
    } = values

    const { shipping, color, brand } = selectedValues

    const newProduct = {
      title,
      description,
      price,
      category: selectedValues.category,
      subs: selectedValues.subs,
      quantity,
      shipping,
      color,
      brand
    }

    console.log('new product: ', newProduct)
    dispatch(createProduct(user.token, newProduct, toast, () => setValues(initialState)))
  }

  const getSubs = id => {
    console.log('get subs: ', id)
    if (id === 'default') {
      setSelectedValues({ ...selectedValues, subs: [], category: id })
      setValues({ ...values, subs: [] })
    } else {
      dispatch(getCurrentCategorySubs(id, () => setSelectedValues({ ...selectedValues, subs: [], category: id })))
    }
  }

  const renderFormContent = () => {
    return Object.keys(values).map((key) => {
      if (typeof values[key] === 'string') {
        return (
          <ProductInput
            key={key}
            prop={key}
            value={values[key]}
            onChange={({ target }) => setValues({ ...values, [key]: target.value })}
          />
        )
      } if (key === 'subs') {
        return values[key].length > 0 ? (
          <MultipleSelect
            name={key}
            key={key}
            values={values[key]}
            selectedValues={selectedValues[key]}
            onChange={value => setSelectedValues({ ...selectedValues, [key]: value })}
          />
        ) : null
      } if (key === 'images') {
        return <FileUpload key={key} />
      }
      return (
        <ProductSelect
          key={key}
          prop={key}
          values={values[key]}
          onChange={({ target }) => {
            if (key === 'category') {
              getSubs(target.value)
            } else {
              setSelectedValues({ ...selectedValues, [key]: target.value })
            }
          }}
        />
      )
    })
  }

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <LoadingTitle loading={loading} title='Create product' />
          <form onSubmit={handleSubmit} className='form-group'>
            {renderFormContent()}
            <button type='submit' className='btn btn-outline-info'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
