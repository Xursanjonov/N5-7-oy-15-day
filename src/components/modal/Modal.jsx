import React, { Fragment, memo } from 'react'
import './modal.scss'

const Modal = ({ children, close, title }) => {
    return <Fragment>
        <div onClick={() => close(null)} className='overlay'></div>
        <div className='modal'>
            <h1 className='title'>{title ?? 'Modal'}</h1>
            {children}
        </div>
    </Fragment>
}

export default memo(Modal)