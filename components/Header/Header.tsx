import ThemeSwitch from '@/lib/ThemeSwitcher'
import Link from 'next/link'
import React from 'react'

import SideBar from "@/components/Header/SideBar"

export default function Header() {
  return (
    <>
      <header className="py-4 px-4 md:px-20">
        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <div className="container p-4 md:px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="group">
                <Link href={'/'}>
                  <h1 className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">W.</h1>
                </Link>
              </div>

              {/* Navigation Links */}
              <div>
                <ul className="flex gap-4 lg:gap-6 items-center font-medium">
                  {[
                    { href: '/about', label: 'About' },
                    { href: '/projects', label: 'Projects' },
                    { href: '/tech', label: 'Tech' },
                    { href: '/github', label: 'Github' },
                    { href: '/contact', label: 'Contact' }
                  ].map((link) => (
                    <li key={link.href} className="group">
                      <Link
                        href={link.href}
                        className="relative inline-block text-foreground 
                        transition-colors duration-300 
                        group-hover:text-primary
                        after:absolute after:bottom-[-4px] after:left-0 
                        after:w-0 after:h-[2px] after:bg-primary 
                        after:transition-all after:duration-300 
                        hover:after:w-full"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  {/* Theme Switcher */}
                  <li className="text-2xl hover:text-primary transition-colors duration-300">
                    <ThemeSwitch />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="block sm:hidden z-50">
          <SideBar />
        </div>
      </header>
    </>
  )
}
