import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaBars, FaUser, FaBarsStaggered } from "react-icons/fa6";
import { getProfile } from '../../lib/slice/profileSlice';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../lib/api/userApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../lib/slice/authSlice';
import './header.scss'

const Header = ({ bars, setBars }) => {
    const [bool, setBool] = useState(false)
    const { data: aboutMe } = useGetProfileQuery()
    const [updateProfile, { data }] = useUpdateProfileMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleProfile = () => {
        updateProfile({ ...aboutMe?.innerData?.user })
        dispatch(getProfile(data?.innerData?.user));
        navigate('/admin/profile');
    }

    return (
        <header className='header'>
            <div className="header__left">
                <button onClick={() => setBars(p => !p)} className='bars'>
                    {
                        bars ?
                            <FaBars fontSize={24} color='black' />
                            :
                            <FaBarsStaggered fontSize={24} color='black' />
                    }
                </button>
                <label className='search'>
                    <span className='search-icon'> <FaSearch /> </span>
                    <input className='search-input' type="search" placeholder="Search..." />
                </label>
            </div>
            <div className="header__right">
                <select className="language">
                    <option value="uz">UZ</option>
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>
                <button onClick={() => setBool(p => !p)} className="profile">
                    <FaUser fontSize={20} className='profile-icons' />
                    {
                        bool ? (
                            <div className="profile-click">
                                <button onClick={handleProfile}>Profile</button>
                                <button>Setting</button>
                                <button onClick={() => dispatch(logout())} className='log-out'>Log out</button>
                            </div>
                        ) : <></>
                    }
                </button>
            </div>
        </header>
    )
}

export default memo(Header)