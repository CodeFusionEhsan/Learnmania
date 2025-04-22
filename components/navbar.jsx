"use client";
import { useState } from 'react';
import Link from 'next/link';

const AnimatedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 bg-400% animate-flow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Learn | Mania
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/courses">Courses</NavLink>
              <NavLink href="/account">Account</NavLink>
              <Link
                href="/upload"
                className="relative px-6 py-2.5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-glow hover:shadow-cyan-400/30
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 
                         before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
              >
                <span className="relative z-10">Upload Course</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white 
                       hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink href="/">Home</MobileNavLink>
          <MobileNavLink href="/courses">Courses</MobileNavLink>
          <MobileNavLink href="/progress">Your Progress</MobileNavLink>
          <MobileNavLink href="/progress">Account</MobileNavLink>
          <MobileNavLink href="/upload">Upload Course</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="relative px-3 py-2 text-gray-300 hover:text-white text-lg font-medium transition-all
             hover:drop-shadow-glow hover:shadow-cyan-400/30 hover:scale-105
             before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5
             before:bg-cyan-400 before:origin-left before:scale-x-0 before:transition-transform
             hover:before:scale-x-100"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, children }) => (
  <Link
    href={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white 
             hover:bg-gray-700 transition-colors"
  >
    {children}
  </Link>
);

export default AnimatedNavbar;