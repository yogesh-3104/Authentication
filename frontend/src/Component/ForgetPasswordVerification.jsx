import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPasswordVerification() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUserData(data);
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id=userData._id;
            console.log(id)
            const url = `http://localhost:3000/auth/verifyForgetcode/${id}`;
            const res = await axios.post(url, { code });
            console.log(res);
            
            if (res.data.success === true) {
                // Redirect to reset password page
                navigate('/setNewPassword')
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
            setError(error.response.data.message || 'Error verifying code');
        }
    };

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-4">Forget Password Verification</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Verify Code
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPasswordVerification;