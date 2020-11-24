import React from 'react'

const FileUpload = () => {
  const fileUploadhandler = e => {
    console.log('event: ', e.target.files)
  }

  return (
    <div className='py-3 row'>
      <label className='btn btn-primary'>
        Choose file
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

export default FileUpload
