import React from 'react'

const NavBar = () => {
  return (
    <div className="w-full bg-blue-600">
      {/* Constrained container */}
      <header className="max-w-[1280px] mx-auto py-3 flex items-center justify-between">
        {/* Left side (logo/brand) */}
        <p className="text-white font-bold text-lg">MyApp</p>

        {/* Right side (nav links) */}
        <nav className="flex gap-6 text-white">
          <p className="cursor-pointer hover:underline">Home</p>
          <p className="cursor-pointer hover:underline">About</p>
          <p className="cursor-pointer hover:underline">Contact</p>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
