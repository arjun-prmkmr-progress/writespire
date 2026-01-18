export interface InputField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'outline-select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  maxLength?: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'blog' | 'marketing' | 'social' | 'email' | 'ads';
  icon: string;
  inputs: InputField[];
}

export interface GeneratedContent {
  id: string;
  templateId: string;
  templateName: string;
  content: string;
  inputs: Record<string, string>;
  timestamp: number;
}

export interface Document {
  id: string;
  title: string;
  contents: GeneratedContent[];
  createdAt: number;
  updatedAt: number;
}
