// components/PageTitle.tsx
import React from "react";

interface PageTitleProps {
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, icon }) => (
    <div className="space-y-4 text-center animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-4">
            {icon && (
                <span className="text-primary-600 dark:text-primary-400 
                    opacity-80 hover:opacity-100 
                    transition-all duration-300 
                    transform hover:scale-110
                    bg-primary-100 dark:bg-primary-800 
                    rounded-full p-3 
                    shadow-md hover:shadow-lg">
                    {icon}
                </span>
            )}
            {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
    </div>
);

export default PageTitle;