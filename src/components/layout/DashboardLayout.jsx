import React from 'react'

const DashboardLayout = () => {
    // With Sidebar and navbar
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">Dashboard</h1>
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

