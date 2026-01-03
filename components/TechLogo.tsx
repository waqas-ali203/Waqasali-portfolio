import Image from 'next/image'
import React from 'react'
interface props{
skill:{
    skill_name: string,
    Image: string,
    width: number,
    hight: number,
}
index: number
}


export default function TechLogo({skill,index}:props) {
  return (
    <>
        {/* <div className='h-auto w-[40px] sm:w-[60px] ' style={{ width:'60px'}}> */}
        <div className='h-auto w-[40px] sm:w-[60px] ' >
            <Image src={skill.Image} alt={skill.skill_name} height={skill.hight} width={skill.width} priority />
        </div>
    
    </>
  )
}
