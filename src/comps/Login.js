import React, { useState } from 'react'
import app from '../fbase'
import { auth } from '../fbase'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import appStore from '../img/appStore.png'
import playStore from '../img/playStore.png'
import messages from '../img/messages.png'
import messagesDark from '../img/messagesDark.png'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Helmet } from 'react-helmet'
import chatAlot3 from '../img/chatAlot3.png'
import chatAlotLight from '../img/chatAlotLight.png'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import logoDark from '../img/logoDark.png'
import logoLight from '../img/logoLight.png'

function Login({ user, setUser, email, setEmail, password, setPassword }) {

    const [isDark, setIsDark] = useState(false);

    const toggleDarkMode = () => {
        {isDark ? setIsDark(false) : setIsDark(true)}
    }

    const TITLE = 'Chatalot | Sign In'

    const provider = new GoogleAuthProvider();

    const [showPW, setShowPW] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async e => {
        try{
            setEmailError('');
            setPasswordError('')
            e.preventDefault();
            await auth.signInWithEmailAndPassword(email, password);
        }catch(err) {
            if('auth/invalid-email') {
                setEmailError("Invalid Email. Please try again.");
            }
            
            if('auth/invalid-password'){
                setPasswordError("Invalid Password. Please try again.")
            }
        }
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    }

    const showPassword = () => {
        { showPW === true ? setShowPW(false) : setShowPW(true) }
    }

    return(
        <div className={isDark ? 'dark' : ''}>

            <div className="flex flex-row justify-center items-center h-screen dark:bg-[#282535]">
                <Helmet>
                    <title>{ TITLE }</title>
                </Helmet>
                <img src={isDark ? messagesDark : messages} className="w-[325px] shadow-2xl rounded-[3.3rem] hidden md:block sm-w-[300px]"></img>
                <div className="sm:p-12">
                    <div className="dark:border dark:border-white">
                        <div className="sm:shadow-sm flex flex-col p-10 text-center sm:border overflow-hidden sm:border-gray-300 dark:border-none dark:bg-[#282535]">
                            <form onSubmit={handleLogin}>
                                <div className="w-full flex flex-col">
                                    <div className="flex justify-center items-center flex-row mb-4">
                                        <button type="button" onClick={toggleDarkMode}>
                                            <img className="w-8 h-8 mr-4" src={isDark ? logoLight : logoDark} />
                                        </button>
                                        <img className="w-36" src={isDark ? chatAlotLight : chatAlot3} />
                                    </div>
                                    <div>
                                        <span class="absolute flex items-center pt-3 pl-2">
                                            <MdEmail className="h-5 w-5 fill-slate-300"/>
                                        </span>
                                        <div className="mb-6">
                                            <input value={email} onChange={e => setEmail(e.target.value)}name="email" type="text" className="dark:bg-[#282535] pl-10 py-2 mb-1 placeholder:italic placeholder:text-sm dark:placeholder:text-white placeholder:text-violet-300 block w-full focus:outline-none border-b-2 border-b-violet-300 hover:border-b-pink-500 transition-color duration-300 ease-in-out text-pink-500" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="absolute w-fit ml-60 pt-2.5 pl-2">
                                            <button className="" type="button" onClick={showPassword}>{showPW === true ? <VscEyeClosed className="h-5 w-5 dark:fill-white fill-slate-500 hover:fill-pink-500 duration-300 ease-in-out"/> : <VscEye className="h-5 w-5 dark:fill-white fill-slate-500 hover:fill-pink-500 duration-300 ease-in-out"/>}</button>
                                        </div>
                                        <span class="absolute flex items-center pt-2.5 pl-2">
                                            <RiLockPasswordFill className="h-5 w-5 fill-slate-300"/>
                                        </span>
                                        <input value={password} onChange={e => setPassword(e.target.value)} name="password" type={showPW == true ? 'text' : 'password'} className="dark:bg-[#282535] pl-10 mb-6 py-2 placeholder:italic placeholder:text-sm dark:placeholder:text-white placeholder:text-violet-300 block w-full focus:outline-none border-b-2 border-b-violet-300 hover:border-b-pink-500 transition-color duration-300 ease-in-out text-pink-500" placeholder="Password" />
                                    </div>
                                </div>
                                <button type="submit" className="shadow-2xl rounded-md py-3 my-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 w-full">Log In</button>
                                <p className="max-w-fit text-sm text-center text-red-500">{emailError != '' ? `${emailError}` : ''}</p>
                                <p className="max-w-fit text-sm text-center text-red-500">{passwordError != '' ? `${passwordError}` : ''}</p>
                                <div className="w-full flex flex-row justify-center mt-2 items-center">
                                    <div className="w-full h-[1px] bg-gray-200"/> 
                                    <p className="px-6 text-gray-400 font-semibold font-base">OR</p>
                                    <div className="w-full h-[1px] bg-gray-200"/>
                                </div>
                            </form>
                            <div className="mt-6">
                                <div className="flex flex-row justify-center items-center mb-4">
                                    <FcGoogle /><button onClick={signInWithGoogle}><p className="ml-2 text-sm font-semibold"><span className="text-pink-500 hover:cursor-pointer hover:text-purple-500 duration-300 ease-in-out dark:text-white">Log in with Google</span></p></button>
                                </div>
                                <p className="text-sm dark:text-white">Forgot <span className="text-pink-500 hover:cursor-pointer hover:text-purple-500 duration-300 ease-in-out">password</span>?</p>
                            </div>
                        </div>
                    </div>
                    <div className="sm:shadow-sm flex flex-col p-6 mt-2 text-center w-[350px] sm:border sm:border-gray-300 dark:border-none">
                        <p className="text-sm dark:text-white">Dont have an account? <span className="text-pink-500 hover:cursor-pointer hover:text-purple-500 duration-300 ease-in-out">Sign Up</span></p>
                    </div>
                    <div className="flex flex-col text-center text-sm mt-4">
                        <p className="dark:text-white">Chat on the app.</p>
                        <div className="flex flex-row justify-center mt-4">
                            <img src={appStore} className="h-[38px] m-1 hover:cursor-pointer"></img>
                            <img src={playStore} className="h-[38px] m-1 hover:cursor-pointer"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login