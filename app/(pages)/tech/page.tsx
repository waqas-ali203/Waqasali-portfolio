// import React from 'react';
// import { Metadata } from 'next';
// import PagesMainLayout from '@/components/PageMainLayout';
// import PageTitle from '@/components/PageTitle';
// import Technologies from '@/components/Technelogies';
// import Techstack from '@/components/Techstack';
// import { Cpu } from "lucide-react"
// {/* <Settings /> */ }

// export const metadata: Metadata = {
//   title: 'Tech Stack and About Me',
//   description:
//     'I am a software engineer with experience in a variety of technologies, including React, Node.js, Express.js, MongoDB, PostgreSQL, HTML, CSS, JavaScript, Python, C#, Prisma, AWS, React Native, Next.js, CPP, and Java. Passionate about building innovative applications.',
// };

// const Tech = () => {
//   return (
//     <PagesMainLayout>
//       <PageTitle title="Technologies & Tools"
//         subtitle="These are the tools and technologies I work with to create amazing applications."
//         icon={<Cpu />} />
//       {/* Divider */}
//       <div className="border-t  my-8"></div>

//       {/* Technologies Section */}
//       <section className="space-y-8">
//         <div className="p-6">
//           <Technologies />
//         </div>
//         <div className="p-6">
//           <Techstack />
//         </div>
//       </section>

//     </PagesMainLayout>
//   );
// };

// export default Tech;

import React from 'react';
import { Metadata } from 'next';
import PagesMainLayout from '@/components/PageMainLayout';
import PageTitle from '@/components/PageTitle';
import Techstack from '@/components/Techstack';
import { Cpu } from "lucide-react";
import Technologies from '@/components/Technelogies';

export const metadata: Metadata = {
  title: 'Tech Stack and Tools',
  description: 'Comprehensive overview of technologies and tools used in software development.',
};

const Tech = () => {
  return (
    <PagesMainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle
          title="Technologies & Tools"
          subtitle="These are the tools and technologies I work with to create amazing applications."
          icon={<Cpu />}
        />

        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

        <section className="space-y-8">
          <div >
            <Technologies />
          </div>

          <div >
            <Techstack />
          </div>
        </section>
      </div>
    </PagesMainLayout>
  );
};

export default Tech;