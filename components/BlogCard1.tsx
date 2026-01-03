"use client";
import React from 'react'
import { BackgroundGradient } from "@/components/ui/background-gradient";
interface RepoProps {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
}

const BlogCard1 = ({ repo, key }: { repo: RepoProps, key: number }) => {
    return (
        <div className="flex justify-center">
            <BackgroundGradient className="flex h-full w-[300px] flex-col rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className='block'>
                        <div className="bg-white dark:bg-zinc-900 p-6">
                            <h6 className='text-lg font-bold text-gray-800 dark:text-white mb-2'>{repo.name}</h6>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                {repo.description ? (repo.description.length > 30 ? `${repo.description.substring(0, 30)}...` : repo.description) : "No description available for this repo"}
                            </p>
                        </div>
                    </a>
                </div>
            </BackgroundGradient>
        </div>
    )
}

export default BlogCard1