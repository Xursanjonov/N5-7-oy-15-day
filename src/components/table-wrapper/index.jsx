import React, { Fragment, useState } from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FaPen, FaTrashCan } from 'react-icons/fa6'
import { GiPin } from "react-icons/gi"
import { BsPinAngle } from "react-icons/bs";
import { useUpdateCustomersMutation } from '../../lib/api/customers'
import Modal from '../modal/Modal'
import './table-wrapper.scss'

const TableWrapper = ({ title, user, id }) => {
    const [showModal, setShowModal] = useState(false)
    const [updates, { isLoading }] = useUpdateCustomersMutation()

    const updatePin = () => {
        updates({ id: user?._id, body: { ...user, pin: !user?.pin } })
    }
    const updateUser = (event) => {
        event.preventDefault()
        console.log(user)
        setShowModal({ ...user })
    }
    const handleUpdateUser = (event) => {
        event.preventDefault()
        console.log(showModal)
        // updates({ id: user?._id, body: { ...showModal } })
    }

    return (
        <Fragment>
            <li className='customers-ul-li' key={user?._id}>
                <p className='id'>

                    {
                        title !== 'seller' ? <button title='Qadash uchun 2 martta bosing' className='pin' onDoubleClick={updatePin}>
                            {
                                user?.pin ? <GiPin fontSize={20} color='red' /> : <BsPinAngle fontSize={20} color='blue' />
                            }
                        </button> : <></>
                    }
                    <span title={`USER ID: ${user?._id}`}>
                        {id + 1}.
                    </span>
                </p>
                <Link to={`/admin/${title !== 'seller' ? 'customer' : 'seller'}/${user?._id}`} className='name'>
                    <p>{user?.fname} {user?.lname}</p>
                </Link>
                <p className='address'>{user?.address}</p>
                <a href={`tel:${user?.phone_primary}`} target='_blank'>
                    <p className='tel'>{user?.phone_primary}</p>
                </a>
                <div className='price'>
                    <span className={user?.budget > 0 ? 'black' : (user?.budget < 0 ? 'red' : (user?.budget === 0 ? 'orange' : ''))}>
                        {user?.budget > 0 ? (user?.budget)/* .brm() */ + ' $' : user?.budget === 0 ? (user?.budget)/* .brm() */ : (user?.budget)/* .brm() */ + ' $'}
                    </span>
                </div>
                <div className='more'> <span>Batafsil</span> </div>
                <div className='btns'>
                    <span>To`lov</span>
                    <button className='edit' onClick={updateUser}>
                        <FaPen fontSize={15} />
                    </button>
                    {
                        user?.role === 'awner' ? (
                            <button className='delete'>
                                <FaTrashCan fontSize={15} color='red' />
                            </button>
                        ) : <></>
                    }
                </div>
            </li>
            {
                showModal ? (
                    <Modal close={handleUpdateUser} key={'1'} title={'Update User'} >
                        <form onSubmit={() => updates(({ id: user?._id, body: { ...showModal } }))} className="update-form">
                            <label className='create-label'>First Name
                                <input onChange={(e) => setShowModal(p => ({ ...p, fname: e.target.value }))} value={showModal?.fname}
                                    className='create-input' type="text" />
                            </label>
                            <label className='create-label'>Last Name
                                <input onChange={(e) => setShowModal(p => ({ ...p, lname: e.target.value }))} value={showModal?.lname}
                                    className='create-input' type="text" />
                            </label>
                            <label className='create-label'>Address
                                <input onChange={(e) => setShowModal(p => ({ ...p, address: e.target.value }))} value={showModal?.address}
                                    className='create-input' type="text" />
                            </label>
                            <label className='create-label'>Phone number
                                <input onChange={(e) => setShowModal(p => ({ ...p, phone_primary: e.target.value }))} value={showModal?.phone_primary}
                                    className='create-input' type="text" />
                            </label>
                            <button type='submit' className='update-btn'>Update</button>
                        </form>
                    </Modal>
                ) : <></>
            }
        </Fragment>
    )
}

export default memo(TableWrapper)