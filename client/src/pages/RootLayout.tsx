import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const RootLayout: React.FC = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>

    )
}

export default RootLayout
