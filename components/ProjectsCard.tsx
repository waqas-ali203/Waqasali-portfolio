'use client'
import React, { useState, useEffect } from 'react'

export default function ProjectsCard() {
  const [hover, setHover] = useState(false)
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  useEffect(() => {
    console.log(hover)
    console.log()
  }, [hover])


  return (
    <>
      <div className="border-b-2">
        <div className="flex justify-between px-12  py-8  hover:scale-110 transition-all cursor-pointer my-2" >
          <h1 className='text-6xl'>Name</h1>
          <h6 className='text-lg'>Type</h6>
        </div>
      </div>
    </>
  )
}
