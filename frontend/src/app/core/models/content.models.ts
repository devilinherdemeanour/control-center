export interface Blog {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  tags: string[];
  coverImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AboutContent {
  headline: string;
  subheadline: string;
  body: string;
  mission: string;
  vision: string;
  teamIntro: string;
  updatedAt?: string | null;
}

export interface Page {
  id?: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  seoTitle: string;
  seoDescription: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  contactEmail: string;
  social: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  updatedAt?: string | null;
}

export interface DashboardSummary {
  counts: {
    blogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    pages: number;
    publishedPages: number;
  };
  recentBlogs: Blog[];
  aboutUpdatedAt: string | null;
  settingsUpdatedAt: string | null;
  siteName: string;
}
