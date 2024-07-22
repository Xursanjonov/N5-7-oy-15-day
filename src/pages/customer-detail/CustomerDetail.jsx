import React, { memo } from 'react'
import { useParams } from 'react-router-dom'

const CustomerDetail = () => {
    const { customerId } = useParams()
    console.log(customerId)

    return (
        <div>CustomerDetail</div>
    )
}

export default memo(CustomerDetail)