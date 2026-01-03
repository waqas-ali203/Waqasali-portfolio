// components/MainLayout.tsx
import React, { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

const PagesMainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="
            w-full 
            max-w-7xl 
            mx-auto 
            overflow-y-auto 
            max-h-[calc(100vh-250px)] 
            scrollbar-thin 
            scrollbar-thumb-gray-300 
            scrollbar-track-gray-100 
            px-4 
            sm:px-2 
            lg:px-10 
            py-4 
            transition-all 
            duration-300 
            ease-in-out 
            hover:scrollbar-thumb-gray-400 scrollBar
        ">
            {children}
        </div>
    );
};

export default PagesMainLayout;