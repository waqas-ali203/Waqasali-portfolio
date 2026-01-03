'use client'
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react';
import rightArrow from '../public/lotties/rightArrow.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RightArrow() {
  // const [path, setPath] = useState('')

  const list = ['/', '/projects', '/about','/github', '/contact', '/tech']

  const pathname = usePathname()

  function getNextPath(list: string[], pathname: string) {
    // Find the index of the current pathname in the list
    const currentIndex = list.indexOf(pathname);
    // If the pathname is not in the list or it's the last item, return null
    if (currentIndex === -1 || currentIndex === list.length - 1) {
      return null;
    }
    // Return the next pathname from the list
    return list[currentIndex + 1];
  }

  let link = getNextPath(list, pathname) || ''
  let letter = link.slice(1, 2).toUpperCase()
  let pageName = link.split('/')[1]

  // if (letter === 'T') {
  //   letter = " alt T"
  // }
  // if (letter === 'C') {
  //   letter = " alt C"
  // }


  if (link === '') {
    link = '/'
    letter = 'H'
    pageName = 'Home'
  }


  return (
    <>
      <Link href={link}>
        <div className="sm:bottom-2 flex bg-primary items-center me-auto rounded-full rounded-s-none px-2 font-medium text-white ">
          <h6 className='mb-1 text-sm sm:text-base'> let&apos;s have a look on {pageName} <span className=" bg-gray-40 text-white shadow-l pop-out px-1 rounded text-sm">⌘ alt {letter}</span> </h6>
          <Lottie animationData={rightArrow} loop={true} autoPlay={true} className=' -rotate-90 h-8 w-8' />
        </div>
      </Link>
    </>
  )
}
