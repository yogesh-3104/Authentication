import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("ji");
            const response = await axios.post("http://localhost:3000/auth/login",{identifier:email,password})
            console.log(email,password);
            
            console.log(response);
            
            if (response.data.error) {
                setError(response.data.error);
            } 
            else {
                // Login successful, redirect to dashboard
                localStorage.setItem("auth-user", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.data));
                navigate('/dashboard');
            }
        } catch (error) {
            setError('Failed to login');
            console.log(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div className='flex justify-center'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className='mt-3 py-1'>

                        <Link to='/forgetPassword' className='text-blue-700 text-md'>forget password?</Link>
                    </div>
                    <div className='flex justify-center items-center py-1'>
                        <Link to='/'>
                            <small>Not have an account?</small>
                            <span className='text-blue-400 text-bold text-xl'>Signup</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;