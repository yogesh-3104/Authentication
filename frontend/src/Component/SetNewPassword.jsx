import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SetNewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUserData(data);
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const id=userData._id;
            const url =`http://localhost:3000/auth/setNewPassword/${id}`
            const res = await axios.post(url, { password });
            if (res.data.success === true) {
                setSuccess(true);
                setError('');
                navigate('/dashboard')
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            console.log(error);
            setError('Error setting new password');
        }
    };

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-4">Set New Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-500 text-sm mb-4">Password reset successfully!</div>
                    )}
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Set New Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SetNewPassword;