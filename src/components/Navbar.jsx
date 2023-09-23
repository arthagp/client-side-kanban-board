'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'

const Navbar = ({ createBoard }) => {
    const [isLogged, setIsLogged] = useState(false)

    const token = Cookies.get('token')

    useEffect(() => {
        if (token) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [])

    const handleLogout = () => {
        const values = ['username', 'id', 'token']
        values.forEach(value => Cookies.remove(value))
    }

    return (
        <div className='flex justify-between items-center py-4 px-6 border-b border-gray-400'>
            <h1 className='font-bold text-3xl text-white'>Boardify</h1>
            <ul className='flex justify-center gap-x-10 items-center'>
                <li>
                    <Link className='opacity-80 text-white hover:opacity-100' href={'/'}>Home</Link>
                </li>
                <li>
                    <Link className='opacity-80 text-white hover:opacity-100' href={'#'}>About us</Link>
                </li>
                <li>
                    <button onClick={createBoard} className='bg-blue-400 hover:bg-white hover:text-gray-400 border-white border rounded-lg px-3 py-1 text-white'>Create Board</button>
                </li>
                <li>
                    <div className="border-l border-gray-500 h-6 mx-2"></div>
                </li>
                <li>
                    {isLogged ? (
                        <Link onClick={handleLogout} className='hover:bg-blue-400 hover:text-white border border-white-400 text-white px-4 py-[4px] rounded-lg' href={'/login'}>Logout</Link>
                    ) : (
                        <Link className='hover:bg-white hover:text-white border border-yellow-400 text-yellow-500 px-4 py-[4px]' href={'/login'}>Login</Link>
                    )}
                </li>

            </ul>
        </div >
    )
}

export default Navbar