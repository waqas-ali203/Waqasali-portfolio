import React from 'react';
import Section_1 from '@/components/Home/Section_1';
import PagesMainLayout from '@/components/PageMainLayout';

export default async function Home() {
  async function getContributions(): Promise<number> {
    try {
      const response = await fetch('https://api.github.com/users/waqas-ali203', {
        next: { revalidate: 86400 },
      });
      if (!response.ok) throw new Error('Failed to fetch GitHub repositories');
      const data = await response.json();
      return data.public_repos;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      return 0; // Fallback to 0 contributions in case of error
    }
  }

  const contributions = await getContributions();

  return (
    <>
      <Section_1 contributions={contributions} />
    </>
  );
}
