import React, { useState } from 'react'
import { auth } from '../fbase'
import { GiPumpkinMask } from 'react-icons/gi'
import ChatRoom from './ChatRoom';
import { Helmet } from 'react-helmet'
import chatAlotLight from '../img/chatAlotLight.png'
import chatAlot2 from '../img/chatAlot2.png'

function Home({user, email}) {

    const [isDark, setIsDark] = useState(true);

    const toggleDarkMode = () => {
        {isDark ? setIsDark(false) : setIsDark(true)}
    }

    const TITLE = 'Chatalot | Chat'

    function handleSignout() {
        auth.signOut();
    }

    return (
        <div className={isDark ? 'dark' : ''}>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <div className="fixed top-0 h-20 shadow-md dark:shadow-none dark:bg-[#181717] dark:text-white bg-white text-black w-screen flex flex-row items-center justify-between p-6 z-10">
                <img className="h-12" src={isDark ? chatAlotLight : chatAlot2}></img>
                <div className="flex flex-row items-center">
                    <button onClick={handleSignout} className="dark:bg-[#282c34] bg-[#6649b8] border-none text-white py-3 sm:px-8 px-3">Sign Out</button>
                    <div className="sm:w-[1px] w-0 h-11 dark:bg-white ml-8 bg-[#6649b8]"></div>
                    <button onClick={toggleDarkMode}><GiPumpkinMask size={30} className="sm:ml-6 ml-0 cursor-pointer dark:text-white text-[#6649b8]" /></button>
                </div>
            </div>
            <ChatRoom isDark={isDark}/>
        </div>
    )
}

export default Home