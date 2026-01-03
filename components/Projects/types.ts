export interface Project {
  id: string;
  title: string;
  src: string;
  color: string;
  url: string;
  about: string;
  tech: string[];
  role: string;
  admin?: string | null;
}[]

export interface ProjectModal {
  active: boolean;
  index: number;
}