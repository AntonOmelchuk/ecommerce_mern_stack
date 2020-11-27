import React from 'react'
import PropTypes from 'prop-types'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const ImageCarousel = ({ images }) => {
  return (
    <Carousel autoPlay infiniteLoop>
      {images.map(({ url }) => <img key={url} src={url} alt='product' />)}
    </Carousel>
  )
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default ImageCarousel
