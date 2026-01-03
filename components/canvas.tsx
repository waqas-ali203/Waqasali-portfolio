'use client'
import { renderCanvas } from '@/lib/canvaus'
import React, { useEffect } from 'react'

export default function Canvas() {

    useEffect(()=>{
        renderCanvas()
    
      },[])

  return (
    <>
     <canvas className="bg-skin-base  pointer-events-none absolute inset-0 -z-10 opacity-60 left-2" id="canvas"></canvas>

    </>
  )
}
