import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-800 text-white flex justify-center items-center gap-2 p-1 text-center fixed bottom-0 w-full'>
            
            <div className="logo font-bold text-xl flex items-center gap-1">
                <span className='text-green-700'>&lt;</span>
                Pswd
                <span className='text-green-700'>Mgr/&gt;</span>
            </div>

            <p>&copy; All rights reserved</p>

            <img src="icons/heart.png" alt="heart" className='w-5' />

        </div>
    )
}

export default Footer