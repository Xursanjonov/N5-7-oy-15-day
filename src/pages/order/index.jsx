import React, { Fragment, memo } from 'react'
import { useGetProductsQuery } from '../../lib/api/productsApi'
import Loading from '../../components/loading'
import CreateProduct from '../../components/products'
import { HiDotsVertical } from 'react-icons/hi'
import empty from '../../assets/empty.jpg'
import './order.scss'

const Order = () => {
    const [store, setStore] = React.useState(false)
    const { data, isLoading } = useGetProductsQuery()

    return (
        <section className='order'>
            <div className='order__h1'>
                <h1>{store ? 'Create' : 'Store'} Products</h1>
                <button onClick={() => setStore(!store)} >{store ? 'Store' : 'Create'} Products</button>
            </div>
            {
                store ? <CreateProduct key={'new-product'} close={setStore} /> : <Fragment>    <ul className="order__ul">
                    <li className='order__id'>ID</li>
                    <li className='order__image'>Image</li>
                    <li className='order__title'>Title</li>
                    <li className='order__category'>Category</li>
                    <li className='order__quentity'>Quentity</li>
                    <li className='order__units'>Units</li>
                    <li className='order__price'>Price</li>
                    <li className='order__tolov'>To`lov</li>
                    <li className='order__btns'>Button</li>
                </ul>
                    <div className='order__container'>
                        {
                            isLoading ? <Loading /> : data?.innerData?.map((product, inx) => (
                                <div key={product?._id} className='order__item'>
                                    <p className='order__item-id'>{inx + 1}.</p>
                                    <p className='order__item-image'>
                                        <img className='image-url' src={empty} alt="Image" />
                                    </p>
                                    <p className='order__item-title'>{product?.title}</p>
                                    <p className='order__item-category'>{product?.category}</p>
                                    <p className='order__item-quentity'>{product?.quantity}</p>
                                    <p className='order__item-units'>{product?.units}</p>
                                    <p className='order__item-price'>{(product?.price).brm()} UZS</p>
                                    <button onClick={() => alert('Sorry')} className="tolov">To`lov</button>
                                    <div className="order__item-btns">
                                        <button className='dot-icon'>
                                            <HiDotsVertical fontSize={18} />
                                        </button>
                                        {/* <button className='pen'>
                                    <FaPen />
                                </button> */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Fragment>
            }
        </section>
    )
}

export default memo(Order)