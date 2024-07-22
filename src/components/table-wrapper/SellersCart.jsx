import React, { Fragment, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPen, FaTrashCan } from 'react-icons/fa6'
import Modal from '../modal/Modal'
import { usePostExpenseMutation } from '../../lib/api/expenseApi'
import './table-wrapper.scss'

const SellersCart = ({ seller, id }) => {
    const [modals, setModals] = useState(false)
    const [expense, setExpense] = useState({ sellerId: seller?._id, amount: '', comment: '' })
    const [createAmount, { data }] = usePostExpenseMutation()

    const handleCreate = (e) => {
        e.preventDefault()
        createAmount(expense)
        setModals(false)
    }

    console.log(data)

    return (
        <Fragment>
            <li className='customers-ul-li' key={seller?._id}>
                <p className='id'>
                    <span title={`SELLER ID: ${seller?._id}`}>
                        {id + 1}.
                    </span>
                </p>
                <div className='name'>
                    <p>{seller?.fname} {seller?.lname}</p>
                </div>
                <p className='address'>{seller?.address}</p>
                <a href={`tel:${seller?.phone_primary}`} target='_blank'>
                    <p className='tel'>{seller?.phone_primary}</p>
                </a>
                <div className='price'>
                    <span className={seller?.budget > 0 ? 'black' : (seller?.budget < 0 ? 'red' : (seller?.budget === 0 ? 'orange' : ''))}>
                        {seller?.budget > 0 ? (seller?.budget).brm() + ' $' : seller?.budget === 0 ? (seller?.budget).brm() : (seller?.budget).brm() + ' $'}
                    </span>
                </div>
                <Link to={`/admin/seller/${seller?._id}`} className='more'> <span>Batafsil</span> </Link>
                <div className='btns'>
                    <span onClick={() => setModals(p => !p)}>Expense</span>
                    <button className='edit'>
                        <FaPen fontSize={15} />
                    </button>
                    {
                        seller?.role === 'awner' ? (
                            <button className='delete'>
                                <FaTrashCan fontSize={15} color='red' />
                            </button>
                        ) : <></>
                    }
                </div>
            </li>
            {
                modals ? (
                    <Modal title='Expense Create' close={setModals}>
                        <form onSubmit={handleCreate} className="expense-modal">
                            <label htmlFor="expense-input1">
                                <span>Amount</span>
                                <input value={expense.amount} onChange={e => setExpense(p => ({ ...p, amount: e.target.value }))}
                                    id='expense-input1' className='expense-input' type="number" placeholder="Amount" />
                            </label>
                            <label htmlFor="expense-input2">
                                <span>Comment</span>
                                <input value={expense.comment} onChange={e => setExpense(p => ({ ...p, comment: e.target.value }))}
                                    id='expense-input2' className='expense-input' type="text" placeholder="Comment" />
                            </label>
                            <label htmlFor="create-expense">
                                <button id='create-expense' type='submit' className='expense-btn'>Create Expense</button>
                            </label>
                        </form>
                    </Modal>
                ) : <></>
            }
        </Fragment>
    )
}

export default memo(SellersCart)