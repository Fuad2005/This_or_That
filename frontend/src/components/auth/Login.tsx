"use client"

import React from 'react'
import axios from 'axios'



function Login() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');






    const handleLogin = React.useCallback((e: React.FormEvent) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, {
            username: username,
            password: password
        }).then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            window.location.href = '/';
        }).catch(err => {
            console.log(err);
        })
    }, [username, password]);

    
  return (
    <div className='h-screen'>
        <div className='w-3/4 min-h-1/2  mx-auto mt-40'>
            <h1 className='text-2xl font-bold text-center py-5'>Sign In</h1>
            <form onSubmit={handleLogin} className="max-w-md mx-auto mt-5 scale-110">
                
                <div className="relative z-0 w-full mb-5 group">
                    <input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" name="username" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                
                
                <button type="submit" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Login