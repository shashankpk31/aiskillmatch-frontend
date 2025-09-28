import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const DashboardLayout = () => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </nav>
            <div className="flex-grow">
                <Outlet />
            </div>
            <footer className="bg-gray-800 text-white p-4 text-sm">
                &copy; 2023 AiSkillMatch. All rights reserved.
            </footer>
        </div>
    )
}

export default DashboardLayout

