/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Resizer from 'react-image-file-resizer'

import filesAPI from '../../api/files'
import { setLoadingValue } from '../../actions/general'
import LoadingTitle from '../LoadingTitle/LoadingTitle'

const FileUpload = ({ values, setValues }) => {
  const { auth: { user }, general: { loading } } = useSelector(state => state)
  const dispatch = useDispatch()

  const fileUploadhandler = e => {
    if (e.target.files.length) {
      dispatch(setLoadingValue(true))
      const { files } = e.target
      const uploadedFiles = values.images
      Object.keys(files).map(key => (
        Resizer.imageFileResizer(files[key], 720, 720, 'JPEG', 100, 0, uri => {
          filesAPI.upload(user.token, uri).then(({ data }) => {
            uploadedFiles.push(data)
            setValues({ ...values, images: uploadedFiles })
            dispatch(setLoadingValue(false))
          }).catch(err => {
            console.error(err)
            setLoadingValue(false)
          })
        }, 'base64')
      ))
    }
  }

  return (
    <div className='py-3 row'>
      <label className='btn btn-primary'>
        <LoadingTitle title='Choose file' loading={loading} />
        <input
          type='file'
          hidden
          multiple
          accept='images/*'
          onChange={fileUploadhandler}
        />
      </label>
    </div>
  )
}

FileUpload.propTypes = {
  values: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  setValues: PropTypes.func.isRequired,
}

export default FileUpload
