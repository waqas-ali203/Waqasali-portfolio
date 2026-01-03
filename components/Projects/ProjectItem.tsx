import { Info } from 'lucide-react';
import { ProjectModal } from './types';
import { color } from './constants';

interface ProjectProps {
  index: number;
  title: string;
  url: string;
  role: string;
  about: string;
  tech: string[]
  setModal: (modal: ProjectModal) => void;
}

export default function ProjectItem({ index, title, about, url, role, tech, setModal }: ProjectProps) {
  return (
    <a
      href={url}
      target="_blank"
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="group  flex w-full items-center justify-between border-b border-gray-300 dark:border-gray-600 px-4 py-10 sm:px-10 sm:py-16"
      rel="noreferrer"
    >
      <div className="flex flex-col space-y-8">
        <h2 className="text-2xl transition-all group-hover:-translate-x-3/ group-hover:scale-11/ sm:text-6xl">
          {title}
        </h2>
        <p className='text-muted-foreground'>{about}</p>
        <div className="flex gap-2 flex-wrap">
          {tech.map((t, i) => (<span key={i} className={`p-1 sm:p-2  rounded-md text-white font-medium capitalize`} style={{ backgroundColor: color[i] }} >{t}</span>))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground transition-all group-hover:translate-x-3/ group-hover:scale-11/ sm:text-lg">
        {role}
      </p>
    </a>
  );
}