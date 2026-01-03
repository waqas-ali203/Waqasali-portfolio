import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import {
  CodeIcon,
  TargetIcon,
  GlobeIcon,
  AwardIcon,
  RocketIcon,
  User
} from "lucide-react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMail
} from "react-icons/ai";
import PagesMainLayout from "@/components/PageMainLayout";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Muhammad Usman | Software Engineer & MERN Stack Developer",
  description:
    "Discover Muhammad Usman, a passionate software engineer and MERN stack developer. Learn about his expertise in React, Node.js, MongoDB, and other cutting-edge technologies. Find out how he transforms ideas into digital reality.",
  keywords:
    "Muhammad Usman, MERN Stack Developer, Software Engineer, Web Developer, Full Stack Developer, React Developer, Node.js Expert, MongoDB Developer, Digital Solutions, Software Development",
  alternates: {
    canonical: "/about",
  },
};

function About() {
  return (
    <PagesMainLayout>
      <PageTitle
        title="About Me"
        subtitle="Transforming ideas into digital magic with code. Passionate about MERN stack development and crafting solutions for the modern world."
        icon={<User />}
      />

      <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-20">
          {/* Profile Card */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:sticky lg:top-24">
            <div className="glass flex flex-col items-center shadow-lg rounded-xl p-6 md:p-8 transform transition-transform hover:scale-105 hover:shadow-xl">
              {/* Profile Image */}
              <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6">
                <Image
                  src="/image.png"
                  alt="Profile picture of Muhammad Usman"
                  className="rounded-full object-cover border-4 border-gray-100 dark:border-gray-800 shadow-lg"
                  fill
                  priority
                />
                <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-1.5 md:p-2 rounded-full shadow-md">
                  <CodeIcon className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Muhammad Usman
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4">
                Software Engineer | MERN Stack Developer
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 md:space-x-6">
                {[
                  {
                    Icon: AiFillGithub,
                    href: "https://github.com/UsmanMERN",
                    color: "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                  },
                  {
                    Icon: AiFillMail,
                    href: "mailto:usman853136@gmail.com",
                    color: "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600",
                  },
                  {
                    Icon: AiFillLinkedin,
                    href: "https://www.linkedin.com/in/mernstack-developers/",
                    color: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600",
                  },
                ].map(({ Icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xl md:text-2xl transition-transform transform hover:scale-110 ${color}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="flex-1 max-w-3xl space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Hi there! I&apos;m Muhammad Usman
            </h2>

            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: CodeIcon,
                  text: "A passionate software engineer and dedicated MERN stack developer on a mission to transform ideas into reality.",
                }, {
                  icon: TargetIcon,
                  text: "With obsessive attention to detail and an unwavering love for crafting digital solutions, I bring dreams to life through code.",
                },
                {
                  icon: GlobeIcon,
                  text: "I believe a great developer isn't just about writing code but understanding problems, architecting elegant solutions, and continuously learning.",
                },
                {
                  icon: AwardIcon,
                  text: "Awarded as 'Best Innovator of the Year' for my exceptional work in full-stack development and leading impactful projects.",
                },
                {
                  icon: RocketIcon,
                  text: "Building scalable, secure, and efficient applications is my forte. I'm always seeking new challenges to push the boundaries of technology.",
                },
                // ... other description items remain the same
              ].map(({ icon: Icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 md:gap-4 bg-gray-100 dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{text}</p>
                </div>
              ))}
            </div>

            {/* Blockquote and Skills sections remain similar */}
            <blockquote className="text-lg italic text-gray-600 dark:text-gray-400 border-l-4 pl-4 border-blue-500">
              &quot;Let&apos;s connect and build something extraordinary together. Turning ideas into digital magic is my passion! ✨&quot;
            </blockquote>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">
              Skills and Expertise
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Proficient in React.js, Node.js, Express, and MongoDB (MERN Stack).</li>
              <li>Experience with modern JavaScript (ES6+) and TypeScript.</li>
              <li>Skilled in building RESTful APIs and integrating third-party services.</li>
              <li>Strong knowledge of UI/UX principles and responsive design.</li>
              <li>Familiar with Git, Docker, and CI/CD pipelines for efficient development workflows.</li>
              <li>Basic understanding of machine learning and computer vision concepts.</li>
            </ul>
          </div>
        </div>

        <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>

        {/* Call to Action */}
        <div className="text-center py-8">
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Interested in collaborating or have a project idea? Let&apos;s make it happen!
          </p>
          <a
            href="mailto:usman853136@gmail.com"
            className="inline-block mt-4 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white text-base md:text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </PagesMainLayout>
  );
}

export default About;