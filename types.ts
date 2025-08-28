

export interface NavLink {
  name: string;
  path: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  imageUrl: string;
  secondaryImageUrl?: string; // For hover reveal (image or video)
  applications: string[];
  features: string[];
  specifications: {
    [key:string]: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  // FIX: Changed React.ReactElement to React.ReactElement<any> to allow passing props like className in React.cloneElement.
  icon: React.ReactElement<any>;
  path: string;
}

export interface CoreService {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  details: string[];
  learnMoreUrl: string;
  viewSpecsUrl?: string;
}

export interface Industry {
    name: string;
    description: string;
    imageUrl: string;
}

export interface Resource {
    title: string;
    type: 'Catalog' | 'Brochure' | 'Certificate' | 'Manual';
    url: string;
}

export interface JobOpening {
    title: string;
    location: string;
    department: string;
    description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  id: string;
  title: string;
  heroImage: string;
  overview: string;
  scopeOfWork: string[];
  faqs: FAQ[];
}


export interface QualitySection {
  id: string;
  title: string;
  content: string;
  points: string[];
}

export interface QualityData {
  intro: string;
  sections: QualitySection[];
  downloads: { title: string; url: string; }[];
}