'use client';

import React from 'react';
import ContactForm from '@/components/ContactForm';
import Lottie from 'lottie-react';
import * as animationData from '../public/lotties/smile.json';
import { motion, type MotionProps } from 'framer-motion';

// Define typed motion components
type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;
const MotionDiv = motion.div as React.FC<MotionDivProps>;

export default function ContactPage() {
    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0 },
    };

    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:block">
                <MotionDiv
                    className="flex flex-col md:flex-row justify-center items-center"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="bg-primary h-80 md:h-96 w-full relative">
                        {/* Quote Section */}
                        <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col justify-center items-center md:h-full w-full absolute md:static -bottom-40 xsm:-bottom-32 z-20 bg-primary h-[110px] xsm:h-[60px] md:w-[40%] gap-8 text-white"
                        >
                            <q className="text-xl md:text-3xl font-medium text-center">
                                I have a joke on programming, but it only works on my computer.
                            </q>
                            <div className="w-[60px] h-[60px] rounded-full hidden md:block">
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    autoPlay={true}
                                    style={{ width: '50px', height: '70px' }}
                                />
                            </div>
                        </MotionDiv>

                        {/* Contact Form Section */}
                        <MotionDiv
                            className="bg-black text-white dark:bg-white dark:text-black w-full md:w-[50%] absolute px-8 md:px-12 py-14 md:py-20 md:right-20 -top-12 shadow-xl"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
                        >
                            <h1 className="text-4xl font-bold mb-4">Contact.</h1>
                            <ContactForm />
                        </MotionDiv>
                    </div>
                </MotionDiv>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden container mx-auto px-4 sm:px-6 lg:px-8">
                <MotionDiv
                    className="flex flex-col md:flex-row justify-center items-center min-h-screen"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="w-full max-w-4xl relative bg-primary overflow-hidden shadow-lg">
                        {/* Quote Section */}
                        <div className="bg-primary text-white text-center p-6 md:p-8">
                            <q className="text-xl md:text-2xl font-medium">
                                I have a joke on programming, but it only works on my computer.
                            </q>
                            <div className="w-[60px] h-[60px] rounded-full hidden md:block">
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    autoPlay={true}
                                    style={{ width: '50px', height: '70px' }}
                                />
                            </div>
                            <div className="w-16 h-16 mx-auto mt-4 md:block hidden">
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    autoPlay={true}
                                    style={{ width: '50px', height: '70px' }}
                                />
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="bg-black text-white dark:bg-white dark:text-black p-8 md:p-12">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact.</h1>
                            <ContactForm />
                        </div>
                    </div>
                </MotionDiv>
            </div>
        </>
    );
}
