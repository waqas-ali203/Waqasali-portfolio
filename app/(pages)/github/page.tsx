
import React from 'react';
import { Metadata } from 'next';
import { FaGithub, FaCode, FaLink } from 'react-icons/fa';
import PagesMainLayout from '@/components/PageMainLayout';
import PageTitle from '@/components/PageTitle';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language?: string;
  stargazers_count: number;
  fork: number
}

export const metadata: Metadata = {
  title: "My Coding Portfolio",
  description: "Innovative web development portfolio showcasing full-stack projects and technical expertise.",
  keywords: "Software Engineer, Web Developer, Full Stack Developer, React, Node.js, GitHub Projects"
};

const GithubProjects = async () => {
  async function fetchRepos(): Promise<Repo[]> {
    try {
      const response = await fetch('https://api.github.com/users/UsmanMERN/repos', {
        next: { revalidate: 43200 },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repositories');
      }

      const data: Repo[] = await response.json();
      // Sort repos by star count and filter out forks
      return data
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      return [];
    }
  }

  const repos = await fetchRepos();

  return (
    <PagesMainLayout>

      <PageTitle title="GitHub Projects"
        subtitle="A curated collection of my most impactful and innovative coding projects."
        icon={<FaGithub />} />
      <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            className="glass rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaCode className="text-blue-500" />
                  {repo.name}
                </h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaLink />
                </a>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-hidden">
                {repo.description || "No description available"}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{repo.language || 'Unknown'}</span>
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  {repo.stargazers_count}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PagesMainLayout>
  );
};

export default GithubProjects;