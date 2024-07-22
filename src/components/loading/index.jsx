import React, { memo } from 'react'
import './loading.scss'

const Loading = () => {
    return (
        <div className="lds-hourglass"></div>
    )
}
// const Loading2 = () => {
//     return (
//         <div className="lds-hourglass"></div>
//     )
// }

export default memo(Loading)