import React from 'react'
import { Metadata } from 'next'
import ContactPage from "@/components/ContactPage"
export const metadata: Metadata = {
  title: "Contact Me",
  description: "Get in touch to discuss your project, collaboration opportunities, or professional inquiries. I’m always open to meaningful conversations and new challenges.",
  keywords:
    "Contact Form, Get in Touch, Hire Web Developer, Contact Software Engineer, Freelance Developer, Remote Developer, MERN Stack Developer, Full Stack Developer, Frontend Developer, Backend Developer, Web Development Services, Custom Web Applications, Software Development, Portfolio, GitHub",
  alternates: {
    canonical: "/contact",
  },
};

export default function page() {
    return (
        <>
            <ContactPage />
        </>
    )
}
