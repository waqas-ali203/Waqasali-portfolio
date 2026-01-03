"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    AiOutlineHome,
    AiOutlineFundProjectionScreen
} from 'react-icons/ai'
import { TbBrandBlogger } from 'react-icons/tb'
import { TiInfoLargeOutline } from 'react-icons/ti'
import { GiTechnoHeart, GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineContactPhone } from 'react-icons/md'
import ThemeSwitch from '@/lib/ThemeSwitcher'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

export default function Bottombar() {
    const pathname = usePathname()

    const NAV_ITEMS = [
        { href: '/', icon: AiOutlineHome, label: 'Home' },
        { href: '/about', icon: TbBrandBlogger, label: 'About' },
        { href: '/projects', icon: AiOutlineFundProjectionScreen, label: 'Projects' },
        { href: '/tech', icon: TiInfoLargeOutline, label: 'Tech' },
        { href: '/github', icon: GiTechnoHeart, label: 'Github' },
        { href: '/contact', icon: MdOutlineContactPhone, label: 'Contact' }
    ]

    const isActive = (link: any) => {
        return (pathname.includes(link) && link.length > 1) || pathname === link
    }

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.1 },
        },
        tap: {
            scale: 0.95,
        }
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 ">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo - Left Side */}
                    <Link
                        href={'/'}
                        className="text-2xl font-bold text-foreground hover:text-primary transition-colors group"
                    >
                        <span className="group-hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] transition-all">
                            U.
                        </span>
                    </Link>

                    {/* Navigation Actions - Right Side */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Switcher */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            <ThemeSwitch />
                        </motion.div>

                        {/* Mobile Menu Trigger */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-foreground hover:text-primary transition-colors"
                                >
                                    <GiHamburgerMenu className="text-2xl" />
                                </motion.button>
                            </SheetTrigger>

                            {/* Sidebar Content */}
                            <SheetContent
                                side={'right'}
                                className="w-[320px] bg-background/95 backdrop-blur-lg shadow-2xl"
                            >
                                <SheetHeader className="border-b border-border/30 pb-6 mb-6">
                                    <SheetTitle className="text-2xl font-bold text-primary">
                                        WebTribe
                                    </SheetTitle>
                                    <SheetDescription className="text-foreground/70">
                                        Crafting digital experiences, one line at a time.
                                    </SheetDescription>
                                </SheetHeader>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className="space-y-2"
                                >
                                    {NAV_ITEMS.map((item) => (
                                        <motion.div
                                            key={item.href}
                                            whileHover="hover"
                                            whileTap="tap"
                                            variants={buttonVariants}
                                        >
                                            <SheetClose asChild>
                                                <Link
                                                    href={item.href}
                                                    className={`
                                                        flex items-center gap-4 p-3 rounded-lg 
                                                        transition-all duration-300
                                                        ${isActive(item.href)
                                                            ? 'bg-primary/10 text-primary font-semibold'
                                                            : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'}
                                                    `}
                                                >
                                                    <item.icon size="24px" className="shrink-0" />
                                                    <span className="text-sm">{item.label}</span>
                                                </Link>
                                            </SheetClose>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}