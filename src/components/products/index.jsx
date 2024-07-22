import React, { memo, useState } from 'react'
import { useCreateProductsMutation } from '../../lib/api/productsApi';
import { useGetSellerQuery } from '../../lib/api/sellerApi';
import './create-product.scss'

const CreateProduct = ({ close }) => {
    const [value, setValue] = useState({ val: '', fname: '' });
    const [sellerId, setSellerId] = useState(null);
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: 0,
        units: '',
        quantity: 0,
        category: '',
        comment: '',
        sellerId: ''
    });
    const { data: searchData, isLoading } = useGetSellerQuery({ value: value?.val?.trim() });
    const [createSeller, { data, error }] = useCreateProductsMutation();

    console.log(sellerId)

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            createSeller({ body: { ...newProduct, sellerId } })
            console.log('Seller created successfully', data);
            console.log('body', { body: { ...newProduct, sellerId } });
            close(p => !p);
        } catch (err) {
            console.error('Failed to create Seller:', err);
        }
    };

    return (
        <section className='create'>
            <input onChange={(e) => setValue(p => ({ ...p, val: e.target.value }))}
                disabled={sellerId?.sellerId ? true : false} value={sellerId?.fname} type="text" placeholder="Seller name" />
            {
                !value?.val?.trim() ? <></> : searchData?.innerData?.map(seller => (
                    <li style={{ cursor: 'pointer' }} key={seller?._id}
                        onClick={() => { setSellerId(seller?._id); setValue('') }}>
                        {seller?.fname}
                    </li>
                ))
            }
            {
                sellerId ? (
                    <div className="create-product">
                        <form onSubmit={handleCreateProduct} className="create-new-product">
                            <label htmlFor="title" className='label'>
                                <span>Title</span>
                                <input
                                    id='title'
                                    required
                                    value={newProduct.title}
                                    onChange={e => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
                                    className='input'
                                    type="text"
                                    placeholder="Title"
                                />
                            </label>
                            <label htmlFor="price" className='label'>
                                <span>Price</span>
                                <input
                                    id='price'
                                    required
                                    value={newProduct.price}
                                    onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                                    className='input'
                                    type="number"
                                    placeholder="Price"
                                />
                            </label>
                            <label htmlFor="category" className='label'>
                                <span>Category</span>
                                <select id="category" onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}>
                                    <option value="phones">Phones</option>
                                    <option value="tv">TV</option>
                                    <option value="book">Book</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="accessoires">accessoires</option>
                                </select>
                            </label>
                            <label htmlFor="units" className='label'>
                                <span>Units</span>
                                <select id="units" onChange={(e) => setNewProduct(prev => ({ ...prev, units: e.target.value }))}>
                                    <option value="dona">Dona</option>
                                    <option value="liter">Liter</option>
                                    <option value="kg">Kg</option>
                                    <option value="g">Giram</option>
                                </select>
                            </label>
                            <label htmlFor="comment" className='label'>
                                <span>Comment</span>
                                <input
                                    id='comment'
                                    value={newProduct.comment}
                                    onChange={e => setNewProduct(prev => ({ ...prev, comment: e.target.value }))}
                                    className='input'
                                    type='text'
                                    placeholder="Comment"
                                />
                            </label>
                            <label htmlFor="quantity" className='label'>
                                <span>Quantity</span>
                                <input
                                    id='quantity'
                                    required
                                    value={newProduct.quantity}
                                    onChange={e => setNewProduct(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                                    className='input'
                                    type="number"
                                    placeholder="quantity"
                                />
                            </label>
                            <label htmlFor="button" className='label'>
                                <span>Button</span>
                                <button className='create-btn' id='button' type='submit'>Create</button>
                            </label>
                        </form>
                        {error && <p className="error">{error.message}</p>}
                    </div>
                ) : <></>
            }
        </section>
    )
}

export default memo(CreateProduct)