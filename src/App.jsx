import React, { Fragment, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Login from './pages/login/Login'
import Customer from './pages/customer/Customer'
import Order from './pages/order'
import Seller from './pages/seller/Seller'
import NotFound from './pages/not-found'

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin/' element={<Layout />} >
          <Route path='customer' element={<Customer />} />
          <Route path='order' element={<Order />} />
          <Route path='seller' element={<Seller />} />
          <Route path='customer/:customerId' element={<Customer />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Fragment>
  )
}

export default memo(App)