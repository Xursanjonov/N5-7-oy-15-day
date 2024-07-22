import React, { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiAdminFill } from "react-icons/ri";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { useGetProfileQuery } from '../../lib/api/userApi';
import { IoStorefrontSharp } from 'react-icons/io5';
import './sidebar.scss'

const Sidebar = ({ bars }) => {
    const { data } = useGetProfileQuery()
    const user = data?.innerData?.user

    return (
        <div className={`sidebar ${!bars ? 'bars-on' : 'bars-off'}`}>
            <Link to={`/admin/customer`} className='sidebar-logo'>
                <RiAdminFill fontSize={24} className='sidebar-logo-icon' color='black' />
                {
                    bars ? user?.fname : <></>
                }
            </Link>
            <ul className='sidebar-ul'>
                <NavLink to={`/admin/customer`} className='li'>
                    <span className='sidebar-ul-li-line'></span>
                    <p className='link'> <MdDashboard className='sidebar-icon' fontSize={24} /> <span className={`${bars ? "block" : 'none'}`}>Customer</span> </p>
                </NavLink>
                <NavLink to={`/admin/order`} className='li'>
                    <span className='sidebar-ul-li-line'></span>
                    <p className='link'> <IoStorefrontSharp className='sidebar-icon' fontSize={24} /> <span className={`${bars ? "block" : 'none'}`}>Store</span> </p>
                </NavLink>
                <NavLink to={`/admin/seller`} className='li'>
                    <span className='sidebar-ul-li-line'></span>
                    <p className='link'> <FaUsers className='sidebar-icon' fontSize={24} /> <span className={`${bars ? "block" : 'none'}`}>Seller</span> </p>
                </NavLink>
            </ul>
        </div>
    )
}

export default memo(Sidebar)