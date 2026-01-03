'use client'

import React from 'react'
import { Skill_data, Frontend_skill, Backend_skill, Full_stack, Other_skill, Other_skill2, Other_skill3 } from '../lib/Constants'
import TechLogo from './TechLogo'
import { useRef } from "react";
import { useInView } from "framer-motion";



export default function Technologies() {
  const smallRef = useRef(null);
  const largeRef = useRef(null);
  const isInViewSmall = useInView(smallRef, { once: true });
  const isInViewLarge = useInView(largeRef, { once: true });

  const logoStylesSmall = {
    opacity: isInViewSmall ? 1 : 0,
    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
  }
  const logoStylesLarge = {
    opacity: isInViewLarge ? 1 : 0,
    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
  }

  return (
    <>
      <div className="flex items-center flex-wrap  xl:hidden mb-10 pt-14">
        <div className=" flex justify-center flex-wrap items-center gap-8 " ref={smallRef}>
          {Skill_data.map((s, i) => (
            <div key={i} style={{ ...logoStylesSmall, transitionDelay: `${i * 0.3}s` }} className='transform-none' >
              <TechLogo skill={s} index={i} />
            </div>))}
        </div>
      </div>

      <div className="flex-col justify-center items-center hidden xl:flex " ref={largeRef}>
        <div className="">
          <div className=" flex justify-center items-center gap-10">
            {Frontend_skill.map((s, i) => (
              <div key={i} style={{ ...logoStylesLarge, transitionDelay: `${i * 0.3}s` }}>
                <TechLogo skill={s} index={i} />
              </div>))}
          </div>
          <div className=" flex justify-center items-center my-4 gap-12">
            {Backend_skill.map((s, i) => (
              <span key={i} style={{ ...logoStylesLarge, transitionDelay: `${i * 0.3}s` }}>
                <TechLogo skill={s} index={i} />
              </span>))}
          </div>
          <div className=" flex justify-center items-center my-4 gap-10">
            {Full_stack.map((s, i) => (
              <span key={i} style={{ ...logoStylesLarge, transitionDelay: `${i * 0.3}s` }}>
                <TechLogo skill={s} index={i} />
              </span>))}
          </div>
          <div className=" flex justify-center items-center my-4 gap-20">
            {Other_skill.map((s, i) => (
              <span key={i} style={{ ...logoStylesLarge, transitionDelay: `${i * 0.3}s` }}>
                <TechLogo skill={s} index={i} />
              </span>))}
          </div>
          <div className=" flex justify-center items-center my-4 gap-16">
            {Other_skill2.map((s, i) => (
              <span key={i} style={{ ...logoStylesLarge, transitionDelay: `${i * 0.3}s` }}>
                <TechLogo skill={s} index={i} />
              </span>))}
          </div>
          <div className=" flex justify-center items-center my-4">
            {Other_skill3.map((s, i) => (
              <span key={i} style={{ ...logoStylesLarge, transitionDelay: `${i * 0.3}s` }}>
                <TechLogo skill={s} index={i} />
              </span>))}
          </div>
        </div>
      </div>
    </>
  )
}
