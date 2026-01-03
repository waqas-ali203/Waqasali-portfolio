import React from 'react'
import { Metadata } from 'next'
import ContactPage from "@/components/ContactPage"
export const metadata: Metadata = {
    title: "Contact Me",
    description: "Get in touch with me today to discuss your project or to learn more about my services. I look forward to hearing from you!",
    keywords: "Contact Form, Get in Touch, Send Message,Contact a Freelancer,Contact a Remote Worker,Contact a Web Developer, Software Engineer, Web Developer, MERN Stack Developer, Full Stack Developer, Front-End Developer, Back-End Developer, Web Development Services, MERN Stack Development Services, Full Stack Development Services, Front-End Development Services, Back-End Development Services, Custom Web Development, Custom Software Development, Coding Project, Portfolio, GitHub",
    alternates: {
        canonical: "/contact"
    }
};
export default function page() {
    return (
        <>
            <ContactPage />
        </>
    )
}
