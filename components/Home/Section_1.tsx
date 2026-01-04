"use client"
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Svg from '../Svg';
import { Download } from 'lucide-react';

export default function Section_1({ contributions }: { contributions: number }) {
  return (
    <div className="max-h-[calc(100vh-250px)] relative flex justify-center items-center flex-col md:flex-row hero-section px-6 lg:px-20 py-12">
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm sm:text-base shadow-lg tracking-widest uppercase">
          Software Engineer
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
          <TypeAnimation sequence={['Transforming Ideas', 1000, 'Building Solutions', 1000, 'Coding Innovations', 1000]} wrapper="span" speed={50} repeat={Infinity} className="block text-blue-600" />
          <span className="block mt-2">with Code & Creativity</span>
        </h1>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
          Passionate MERN Stack Developer specializing in crafting dynamic, scalable web solutions.
          Turning complex challenges into elegant, efficient digital experiences.
        </p>

        {/* Stats Section */}
        <div className="flex justify-center md:justify-start space-x-12 sm:space-x-24 py-6">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600">2+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Years of <br /> Experience
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600">
              {contributions}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Projects / <br /> Contributions
            </p>
          </div>
        </div>

        {/* CV Button */}
        <div className="flex justify-center md:justify-start">
          <a href="https://drive.google.com/uc?export=download&id=1--tZhWLI3tDmfd_5EYc_dFFiyquQfaQQ" download="Muhammad_Usman.pdf" className=" gap-2
          bg-blue-600 text-white
          px-6 py-3 rounded-lg
          text-base font-semibold
          shadow-md hover:shadow-xl
          hover:bg-blue-700
          transition-all duration-300
          transform hover:scale-105 flex items-center gap-2bg-blue-600 text-whitepx-6 rounded-lgtext-base font-semiboldshadow-md hover:shadow-xlhover:bg-blue-700transition-all">
            <Download size={20} />
            Download Resume
          </a>
        </div>

      </div>

      {/* Right Content (SVG / Lottie Animation) */}
      <div className="w-full md:w-1/2 md:flex hidden justify-center items-center">
        <div className="max-w-md lg:max-w-lg xl:max-w-xl">
          <Svg />
        </div>
      </div>
    </div >
  );
}