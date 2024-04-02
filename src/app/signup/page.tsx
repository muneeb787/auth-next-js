"use client"
import React, { useState } from 'react';
import backgroundImage from "../../../public/images/bg-2.jpg";
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';   
import Cookies from 'js-cookie'; 

const SignUpPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Validate user input here if needed

        // Save user data to cookies
        const userData = {
            username,
            email,
            password
        };
        Cookies.set('userData', JSON.stringify(userData)); // Save user data in cookies
        toast.success("Signup successful");
        console.log('Signup successful, user data saved to cookies:', userData);
        router.push('/login');
        // You can handle success or redirect user here
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage.src})`, filter: 'blur(10px)' }}></div>
            <div className="z-10 w-1/2 flex p-2 bg-white  rounded-3xl shadow-lg">
                <div className='w-1/2 rounded-3xl'>
                    <Image className='rounded-3xl object-cover h-full' src={backgroundImage} alt="" />
                </div>
                <div className='w-96 rounded-lg mx-20 my-5 text-black'>
                    <h4 className='text-center font-medium text-lg'>Recova</h4>
                    <h2 className='text-center text-4xl font-medium my-5'>Welcome To Recova</h2>
                    <p className='text-center text-sm text-gray-600 my-5'>Recova is a fast, simple and secure way to recover
                        data. With it, you can protect your privacy and well
                        being anytime and anywhere.
                    </p>
                    <div className='flex flex-col gap-4'>
                        <div className='border-2 rounded-lg flex items-center py-3 px-2'>
                            <FontAwesomeIcon icon={faUser} className="px-2 mr-1 w-8 text-gray-600" />
                            <input className='border-none outline-none w-full' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='border-2 rounded-lg flex items-center py-3 px-2'>
                            <FontAwesomeIcon icon={faEnvelope} className="px-2 mr-1 w-8 text-gray-600" />
                            <input className='border-none outline-none w-full' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='border-2 rounded-lg flex items-center py-3 px-2 text-gray-600'>
                            <FontAwesomeIcon icon={faLock} className="px-2 mr-1 w-8" />
                            <input className='border-none outline-none w-full' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div onClick={handleSignUp} style={{ backgroundColor: "#fde1d0" }} className='cursor-pointer rounded-lg flex justify-center py-3'>
                            <h1  className='text-center text-sm font-medium'>SignUp</h1>
                        </div>
                    </div>
                    <div className='text-center text-sm flex justify-center text-gray-600 my-5'>
                        <p className='' >Already have an Account? </p>
                        <a onClick={()=>{router.push('/login');}} className='text-red-800 font-medium pl-2' href='#'> Sign in</a>
                    </div>
                    <p className='text-center text-xs text-gray-600 my-5'>By signing up. you agree to Our&nbsp;
                        <a className='text-blue-500 text-xs' href='#'>Terms of Use</a> &nbsp;and&nbsp;
                        <a className='text-blue-500 text-xs' href='#'>Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
