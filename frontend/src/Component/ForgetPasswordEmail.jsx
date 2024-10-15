import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call your API to send a password reset email    
            const response = await axios.post(`http://localhost:3000/auth/forgetPasswordEmail`,{email});
            console.log(response);

            if (response.status === 200) {
                setMessage("Password reset email sent successfully!");
                Navigate('/forgetPasswordVerification')
            } else {
                setError("Failed to send password reset email");
            }
        } catch (error) {
            console.log(error)
            setError(error.response.data.message || "Failed to send password reset email");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">{message}</span>
                        </div>
                    )}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Send Password Reset Email
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;