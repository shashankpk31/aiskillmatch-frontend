import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {  
    return (
        <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">    
                    AI Skill Match
                </Link>
                <div>   
                    <Link to="/jobs" className="mr-4">Jobs</Link>
                    <Link to="/about">About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
    