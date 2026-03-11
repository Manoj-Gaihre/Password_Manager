import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between p-2 sm:p-4 bg-gray-600 text-white'>
      <div className="logo font-bold text-2xl">
        <span className='text-green-700'>&lt;</span>
        Pswd
        <span className='text-green-700'>Mgr/&gt;</span>
      </div>
      <div className="right flex items-center">

        <ul className=' gap-4 hidden sm:flex'>
          <li className='cursor-pointer hover:font-bold hover:bg-gray-900 p-1 rounded-lg'>Home</li>
          <li className='cursor-pointer hover:font-bold hover:bg-gray-900 p-1 rounded-lg'>About</li>
          <li className='cursor-pointer hover:font-bold hover:bg-gray-900 p-1 rounded-lg'>Contact</li>
        </ul>
        <a href="https://github.com/" target="_blank"rel="noopener noreferrer" className="ml-4 flex items-center gap-2 font-bold">
          <img src="/icons/github.svg" alt="GitHub" className="w-6" />
          <p>GitHub</p>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
