import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import useLogout from "../../hooks/useLogout";
import useUser from '../../hooks/useUser';

export default function User() {

    const {user} = useAuth(); // Access the user object from AuthContext
    const navigate = useNavigate(); // For navigation
    const logout = useLogout(); // Custom hook for logout functionality
    const [loading, setLoading] = useState(false); // State for loading status
    const getUser = useUser(); // Custom hook to fetch user data

    useEffect(() => {
        getUser(); // Fetch user data when component mounts
    }, []);

    async function onLogout() {
        setLoading(true);
        await logout(); // Execute logout function
        navigate('/'); // Redirect to home after logout
    }

    return (
        <div className='container mt-3'>
            <h4>ID: {user?.id}</h4> {/* Display user ID */}
            <h4>Username: {user?.username}</h4> {/* Display username */}
            <h4>Email: {user?.email}</h4> {/* Display email */}
            <h4>First Name: {user?.first_name}</h4> {/* Display first name */}
            <h4>Last Name: {user?.last_name}</h4> {/* Display last name */}
            <h4>Staff Status: {user?.is_staff ? "Yes" : "No"}</h4> {/* Display staff status */}
            <h4>Wallet Address: {user?.wallet_address}</h4> {/* Display wallet address */}
            <button disabled={loading} type='button' onClick={onLogout}>Logout</button>
            {/* Logout button */}
        </div>
    );
}
