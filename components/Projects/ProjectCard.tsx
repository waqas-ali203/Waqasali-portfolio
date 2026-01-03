import Image from 'next/image'
import React from 'react'
import { color } from '@/components/Projects/constants'
import { Project } from './types'

export default function ProjectCard({ data }: { data: Project }) {
    const { title, src, about, tech, id, url } = data

    return (
        <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                {/* Image Container */}
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image src={`/${src}`} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105 brightness-90 group-hover:brightness-100 " />
                </div>

                {/* Content Container */}
                <div className="p-5 transition-colors duration-300 group-hover:bg-gray-50 dark:group-hover:bg-slate-700">
                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm md:text-base">
                        {about}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                        {tech.map((t, i) => (
                            <span key={i} className=" px-2  py-1  text-xs  md:text-sm  rounded-md  text-white  font-medium  capitalize  transition-all  duration-300  group-hover:opacity-90" style={{ backgroundColor: color[i] || '#4299e1' }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 pointer-events-none"></div>
            </a>
        </div>
    )
}