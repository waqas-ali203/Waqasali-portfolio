"use client";
import React, { useEffect, useState } from "react";
import { MotionDiv } from "./motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export default function BlogCard({ repo }: { repo: Repo }) {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsInView(entry.isIntersecting);
    });

    const cardElement = document.getElementById(`card${repo.id}`);
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, [repo.id]);

  const animation = {
    opacity: isInView ? 1 : 0.2,
    y: isInView ? 0 : 100,
  };

  return (
    <div id={`card${repo.id}`} className="blog-card--container noselect h-72 w-full sm:w-5/6">
      <MotionDiv
        className="h-full w-full"
        key={repo.id}
        animate={animation}
        transition={{ duration: 0.5 }}
      >
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <div className="blog-card--canvas">
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} className={`tracker tr-${i + 1}`} />
            ))}
            <div id="card">
              <MotionDiv
                className="col-span-2 text-lg font-bold capitalize rounded-md"
                animate={animation}
                transition={{ duration: 0.5 }}
              >
                {repo.name}
              </MotionDiv>
              <div className="title">
                <MotionDiv
                  className="col-span-2 text-lg font-bold capitalize rounded-md fixed top-0 p-4"
                  animate={animation}
                  transition={{ duration: 0.5 }}
                >
                  {repo.name}
                </MotionDiv>
                <MotionDiv
                  className="col-span-2 rounded-md px-2"
                  animate={animation}
                  transition={{ duration: 0.3 }}
                >
                  {repo.description?.slice(0, 80) + "..." || "No description available"}
                </MotionDiv>
              </div>
            </div>
          </div>
        </a>
      </MotionDiv>
    </div>
  );
}
