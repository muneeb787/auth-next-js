"use client"
import React, { useState } from 'react';
import backgroundImage from "../../../public/images/bg-2.jpg";
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');

    const handleSubmit = async () => {
        // Get user data from cookies
        const storedUserDataString = Cookies.get('userData');
        if (storedUserDataString) {
            const storedUserData = JSON.parse(storedUserDataString);
            // Compare entered email and password with stored data
            if (email === storedUserData.email && password === storedUserData.password) {
                toast.success('Login successful!');
                console.log('Login successful!');
                Cookies.set('accessToken', "user_logged_in");
                router.push('/');
                // Redirect or handle successful login
            } else {
                toast.error('Login failed. Invalid email or password.');
                console.log('Login failed. Invalid email or password.');
            }
        } else {
            toast.error('No user data found. Please sign up first.');
            console.log('No user data found. Please sign up first.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage.src})`, filter: 'blur(10px)' }}></div>
            <div className="z-10 lg:w-1/2 w-full flex flex-col lg:flex-row p-2 bg-white  rounded-3xl shadow-lg">
                <div className='lg:w-96 w-full rounded-lg lg:mx-20  my-5 text-black'>
                    <h4 className='text-center font-medium text-lg'>Recova</h4>
                    <h2 className='text-center text-4xl font-medium my-5'>Login To Recova</h2>
                    <p className='text-center text-sm text-gray-600 my-5'>Recova is a fast, simple and secure way to recover
                        data. With it, you can protect your privacy and well
                        being anytime and anywhere.
                    </p>
                    <div className='flex flex-col gap-4'>
                        <div className='border-2 rounded-lg flex items-center py-3 px-2'>
                            <FontAwesomeIcon icon={faEnvelope} className="px-2 mr-1 w-8 text-gray-600" />
                            <input className='border-none outline-none w-full' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='border-2 rounded-lg flex items-center py-3 px-2 text-gray-600'>
                            <FontAwesomeIcon icon={faLock} className="px-2 mr-1 w-8" />
                            <input className='border-none outline-none w-full' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div onClick={handleSubmit} style={{ backgroundColor: "#fde1d0" }} className='cursor-pointer rounded-lg flex justify-center py-3'>
                            <h1 className='text-center text-sm font-medium'>Sign In</h1>
                        </div>
                    </div>
                    <p className='text-center text-xs text-gray-600 my-5'>{notification}</p>
                    <div className='text-center text-sm flex justify-center text-gray-600 my-5'>
                        <p className='' >Want to Create Account? </p>
                        <a onClick={() => { router.push('/signup'); }} className='text-red-800 font-medium pl-2' href='#'> Sign Up</a>
                    </div>
                    <p className='text-center text-xs text-gray-600 my-5'>By signing up, you agree to Our&nbsp;
                        <a className='text-blue-500 text-xs' href='#'>Terms of Use</a> &nbsp;and&nbsp;
                        <a className='text-blue-500 text-xs' href='#'>Privacy Policy</a>
                    </p>
                </div>
                <div className='lg:w-1/2 w-full rounded-3xl'>
                    <Image className='rounded-3xl object-cover h-full' src={backgroundImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
