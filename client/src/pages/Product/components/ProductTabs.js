import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const ProductTabs = ({ description }) => {
  return (
    <Tabs type='card'>
      <TabPane tab='Description' key='1'>
        {description}
      </TabPane>
      <TabPane tab='More' key='2'>
        Call us on xxx-xxx-xxx to learn more about this product.
      </TabPane>
    </Tabs>
  )
}

ProductTabs.propTypes = {
  description: PropTypes.string.isRequired
}

export default ProductTabs
