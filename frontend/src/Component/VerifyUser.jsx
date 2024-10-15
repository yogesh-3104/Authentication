import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyUser = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    // const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState("")
    const navigate=useNavigate();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUserData(data);
    }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // const email = userData.email
            const id=userData._id
            
            const response = await axios.post(`http://localhost:3000/auth/verifyYourself/${id}`, { verifyCode:code });
            console.log(response);
            
            if (response.data.success) {
                // setVerified(true);
                setMessage("Your account has been verified!")
                navigate('/dashboard')
            } else {
                setError(response?.data.message || 'Invalid Code');
            }
        } catch (error) {
            console.log( error.response.data.message);
            setError(error.response.data.message ||' Error Verifying User');
        }
    };

    const handleResendEmail=async()=>{
        try {
            console.log("Resend");
            
            const id=userData._id;
            const response = await axios.get(`http://localhost:3000/auth/resendEmail/${id}`);
            if(response.data.status){
                setMessage('Verification Email Resended');
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.message || 'Failed to send email again' )
        }
    }
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="max-w-md p-4 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Verify Your Account</h1>

                {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Enter the code sent to your email:
                        <input
                            type="text"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            className="w-full p-2 pl-10 text-sm text-gray-700 border-2 rounded-md"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Verify
                    </button>

                    <div className='' onClick={handleResendEmail}>
                        <p className='text-sm text-[#4287f5] text-bold'>Send Verification Email</p>
                    </div>
                </form>
                {message && (
                    <div className="text-green-500 text-sm mt-2">
                       {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyUser;