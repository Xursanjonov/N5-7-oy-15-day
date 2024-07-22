import React from 'react'
import './table-title.scss'

const TableTitle = ({ id, name, address, tel, budget, batafsil, buttuons }) => {
    return (
        <ul className="customers-title">
            <li className='id'>{id}</li>
            <li className='name'>{name}</li>
            <li className='address'>{address}</li>
            <li className='tel'>{tel}</li>
            <li className='price'>{budget}</li>
            <li className='more'>{batafsil}</li>
            <li className='btns'>{buttuons}</li>
        </ul>
    )
}

export default (TableTitle)