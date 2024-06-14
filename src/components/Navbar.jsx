import React from 'react'

const Navbar = ({onHighlight}) => {
  return (
    <header className='bg-slate-700 text-white p-6 sm:px-11'>
        <nav>
            <ul className='flex justify-between items-center'>
                <li className='text-3xl font-bold cursor-pointer'>iTask</li>
                <li className='text-2xl font-bold transition-all duration-300 hover:text-3xl cursor-pointer'>
                    <a href="#all-todos" onClick={(e)=> {e.preventDefault(); onHighlight();}} >Your Todos</a>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
