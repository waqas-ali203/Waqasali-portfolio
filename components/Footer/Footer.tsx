import React from 'react';
import RightArrow from '../RightArrow';


const Footer: React.FC = () => {
    return (
        <footer className="dark:text-white text-dark py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-center lg:justify-between items-center">
                    <span className="hidden lg:block">
                        <RightArrow />
                    </span>
                    <p className="text-center lg:text-left">Made With 💓 By Me</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

