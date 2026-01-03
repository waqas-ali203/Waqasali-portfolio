import React from 'react'
import { Metadata } from 'next'

import { FolderOpen } from 'lucide-react'

import { projects } from '@/components/Projects/constants'

import MainLayout from '@/components/MainLayout'
import ProjectCard from '@/components/Projects/ProjectCard'
import Projects from '@/components/Projects/Projects'
import PagesMainLayout from '@/components/PageMainLayout'
import PageTitle from '@/components/PageTitle'


export const metadata: Metadata = {
  title: 'Portfolio Projects',
  description:
    'Showcase of my selected software engineering projects, including web, mobile, and desktop applications. Explore projects built using Next.js, React, Node.js, Express.js, MongoDB, PostgreSQL, HTML, CSS, JavaScript, Python, and C#. Discover innovative and user-friendly applications designed for diverse needs.',
  keywords:
    'Software Engineering Projects, Web Development Projects, Mobile Development Projects, Desktop Development Projects, React, Node.js, Express.js, MongoDB, PostgreSQL, HTML, CSS, JavaScript, Python, C#, Portfolio Projects',
  alternates: {
    canonical: "/projects",
  },
};

const Page = () => {
  return (
    <>
      <PagesMainLayout>

        <MainLayout>
          {/* Title Section */}

          <PageTitle title="Projects"
            subtitle="A showcase of selected projects built with passion and precision, featuring web, mobile, and desktop applications."
            icon={<FolderOpen />} />
          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 my-8"></div>

          {/* Projects Section */}
          <div className="px-4 md:px-8 lg:px-16 xl:px-20">
            <div className="hidden lg:block">
              <Projects />
            </div>
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} data={project} />
              ))}
            </div>
          </div>
        </MainLayout>
      </PagesMainLayout>
    </>
  );
};

export default Page;
