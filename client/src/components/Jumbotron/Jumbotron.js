import React from 'react'
import PropTypes from 'prop-types'
import Typewritter from 'typewriter-effect'

const Jumbotron = ({ text }) => {
  const options = {
    strings: text,
    autoStart: true,
    loop: true
  }
  return (
    <Typewritter options={options} />
  )
}

Jumbotron.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Jumbotron
