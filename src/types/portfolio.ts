export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type SkillCategory =
  | 'Web Development'
  | 'Web Dev'
  | 'Systems & Infrastructure'
  | 'Cybersecurity'
  | 'Languages & Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
  tags: string[];
}

export type CertificateCategory =
  | 'Cybersecurity & Forensics'
  | 'Cybersecurity'
  | 'Cloud & Systems'
  | 'Systems'
  | 'Professional Certifications';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  category: CertificateCategory;
  imageUrl?: string;
  url?: string;
  localAssetUrl?: string;
  tags: string[];
}

export type ProjectCategory =
  | 'Web App'
  | 'Web Dev'
  | 'Security'
  | 'Systems'
  | 'Open Source'
  | 'Other';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
  imageUrl?: string;
  featured: boolean;
  // Case Study detail fields
  tagline?: string;
  architecture?: string;
  problemStatement?: string;
  solution?: string;
  securityConsiderations?: string[];
  keyFeatures?: string[];
  metrics?: { label: string; value: string }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Bio {
  name: string;
  tagline: string;
  roles: string[];
  description: string;
  location: string;
  availableForWork: boolean;
  availabilityLabel: string;
  email: string;
  resumeUrl?: string;
  avatarUrl?: string;
}

export interface PortfolioData {
  bio: Bio;
  skills: Skill[];
  certificates: Certificate[];
  projects: Project[];
  socialLinks: SocialLink[];
}
