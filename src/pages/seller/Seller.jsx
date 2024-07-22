import * as React from 'react';
import { memo, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetSellerQuery } from '../../lib/api/sellerApi'
import Loading from '../../components/loading'
import SellersCart from '../../components/table-wrapper/SellersCart'
import './sellers.scss'

const Seller = () => {
    const [page, setPage] = useState(1)
    const { data: sellers, isLoading } = useGetSellerQuery({ limit: 7, skip: page - 1 })
    const sellersData = sellers?.innerData

    const handleChange = (event, value) => {
        setPage(value)
    }
    const pageCount = React.useMemo(() => (Math.ceil(sellers?.totalCount / 5)))

    return (
        <section className='sellers'>
            <ul className="customers-title">
                <li className='id'>ID</li>
                <li className='name'>Name</li>
                <li className='address'>Address</li>
                <li className='tel'>TEl</li>
                <li className='price'>Budget</li>
                <li className='more'>Batafsil</li>
                <li className='btns'>Buttuons</li>
            </ul>
            <ul className='sellers__li'>
                {
                    !isLoading ?
                        sellersData?.map((seller, inx) => (
                            <SellersCart key={seller?._id} id={inx} seller={seller} />
                        )) : <Loading />
                }
            </ul>
            <Stack spacing={2} className='stack'>
                <Pagination size='medium' count={pageCount} page={page} onChange={handleChange} color="primary" />
            </Stack>
        </section>
    )
}

export default memo(Seller)