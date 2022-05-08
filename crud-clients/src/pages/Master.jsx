import React from 'react'
import { Outlet } from 'react-router-dom'
import Modal from '../components/Modal'
import useClients from '../hooks/useClients'

import "./Pages.css"
const Master = () => {

    const { modal } = useClients();

    return (
        <div className='master'>
            <header className='header-style'>
                <h1>CRUD-Clients</h1>
            </header>
            <Outlet />

            {
                modal ? (<Modal />) : null

            }
        </div>
    )
}

export default Master