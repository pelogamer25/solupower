import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  /** SERP title, when the on-page title isn't the phrase people search for. */
  seoTitle?: string;
  /** SERP snippet, when `description` is too long for the ~160-char cut. */
  seoDescription?: string;
  icon: LucideIcon;
  features: string[];
  accent: "blue" | "teal" | "cyan" | "green";
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  excerpt: string;
  description: string;
  /** SERP title, when the model name alone isn't the phrase people search for. */
  seoTitle?: string;
  /** SERP snippet override; otherwise built from `excerpt` + the category tail. */
  seoDescription?: string;
  specs: { label: string; value: string }[];
  accent: "blue" | "teal" | "cyan" | "green";
  /** Illustrative "desde" price in COP. PLACEHOLDER — replace with real pricing. */
  priceFrom?: number;
  /** Frame index (public/hero/frame-NN.jpg) used as the illustrative image. */
  imageIndex?: number;
}

export interface ProcessStep {
  n: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CaseStudy {
  slug: string;
  /** Optional client name — omitted when the entry showcases a line of work. */
  client?: string;
  sector: string;
  title: string;
  summary: string;
  metric: string;
  /** What the work includes (real process steps / scope). */
  details?: string[];
}

export interface Post {
  slug: string;
  title: string;
  /** SERP title, when the headline is too long for the ~60-char cut. */
  seoTitle?: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
}
