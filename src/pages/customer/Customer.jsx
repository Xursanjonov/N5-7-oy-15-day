import { memo, useState } from 'react'
import { useGetCustomersQuery } from '../../lib/api/customers'
import TableWrapper from '../../components/table-wrapper';
// import Modal from '../../components/modal/Modal';
import Loading from '../../components/loading';
import TableTitle from '../../components/table-title';
// Pagination
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// Pagination end
import './customer.scss'

const Customer = () => {
    const [paidToday, setPaidToday] = useState(2)
    // selects filter
    const [debt, setDebt] = useState(2)
    const [budget, setBudget] = useState(0)
    const [createdAt, setCreatedAt] = useState(-1)

    const [page, setPage] = useState(1)

    const { data } = useGetCustomersQuery({ skip: page - 1, paidToday, debt, createdAt, budget })

    const handleChange = (_, value) => {
        setPage(value)
    }
    const lengthPage = React.useMemo(() => (Math.ceil(data?.totalCount / 10)))

    return (
        <div className='customers'>
            <div className="all__filter">
                <label htmlFor="paid-today">
                    <span>Paid Today</span>
                    <select id="paid-today" className="debt" onChange={(e) => setPaidToday(e.target.value)} >
                        <option value={0} disabled className='id'>Paid Today</option>
                        <option value={2} className='id'>Barchasi</option>
                        <option value={1} className='name'>To`lov qilgan</option>
                        <option value={-1} className='name'>To`lov qilmagan</option>
                    </select>
                </label>
                <label htmlFor="debts">
                    <span>Debt</span>
                    <select id="debts" className="debt" onChange={(e) => setDebt(e.target.value)} >
                        <option value={0} disabled className='id'>Debt</option>
                        <option value={2} className='id'>Barchasi</option>
                        <option value={-1} className='name'>Qarzdorlar</option>
                        <option value={1} className='name'>Haqdorlar</option>
                        <option value={0} className='name'>Nollar</option>
                    </select>
                </label>
                <label htmlFor="createdAt">
                    <span>CreateAt</span>
                    <select id="createdAt" className="debt" onChange={(e) => setCreatedAt(e.target.value)} >
                        <option value={'-1'} className='name'>Latest</option>
                        <option value={'1'} className='name'>Oldest</option>
                    </select>
                </label>
                <label htmlFor="budget">
                    <span>Budget</span>
                    <select id="budget" className="budget" onChange={(e) => setBudget(e.target.value)} >
                        <option value={0} className='id'>Barchasi</option>
                        <option value={-1} className='name'>Eng Ko`pdan Kamga</option>
                        <option value={1} className='name'>Eng Kamdan Ko`pga</option>
                    </select>
                </label>
            </div>
            <TableTitle key={'customer-title'} id={'ID'} name={'Name'} address={'Address'} tel={'Tel'} batafsil={'Batafsil'} budget={'Budget'} buttuons={'Buttons'} />
            <ul className="customers-ul">
                {
                    data?.innerData ?
                        data?.innerData?.map((user, inx) => (
                            <TableWrapper key={user?._id} id={inx} user={user} />
                        )) : <Loading />
                }
            </ul>
            {/* Pagination */}
            <Stack spacing={2} className='stack'>
                <Pagination size='medium' count={lengthPage} page={page} onChange={handleChange} color="primary" />
            </Stack>
            {/* Pagination end */}
        </div>
    )
}

export default memo(Customer)