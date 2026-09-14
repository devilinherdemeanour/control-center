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
    news?: number;
    services?: number;
    lawyers?: number;
    users?: number;
  };
  recentBlogs: Blog[];
  recentNews?: NewsItem[];
  aboutUpdatedAt: string | null;
  settingsUpdatedAt: string | null;
  contactUpdatedAt?: string | null;
  siteName: string;
}

export interface AdminUser {
  id?: string;
  username: string;
  fullName?: string;
  role: 'admin';
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  shortTitle?: string;
  slug: string;
  coverImage: string;
  content: string;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

export interface FirmService {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  icon?: string;
  status: 'draft' | 'published';
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lawyer {
  id: string;
  firstName: string;
  lastName: string;
  direction: string;
  title: string;
  photo: string;
  bio: string;
  details: string;
  email: string;
  phone: string;
  order?: number;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactInfo {
  headline: string;
  subheadline: string;
  address: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  emailSecondary: string;
  workingHours: string;
  mapEmbedUrl: string;
  mapLat: string;
  mapLng: string;
  whatsapp: string;
  telegram: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  extraNote: string;
  updatedAt?: string | null;
}
