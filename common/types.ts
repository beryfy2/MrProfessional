export type FileMeta = {
  _id?: string;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
};

export type QA = {
  question: string;
  answer: string;
};

export type Subtitle = {
  _id?: string;
  navItem: string;
  title: string;
  content?: string;
  files: FileMeta[];
  questions: QA[];
};

export type NavItem = {
  _id?: string;
  name: string;
  slug: string;
  order: number;
  subtitles?: string[];
};

export type Employee = {
  _id?: string;
  name: string;
  email: string;
  position: string;
  department: string;
  phone?: string;
  photoUrl?: string;
  address?: string;
  bio?: string;
  joinDate?: string;
  manager?: string;
  salary?: string;
};

export type Enquiry = {
  _id?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  subject: string;
  message: string;
  date?: string;
};

