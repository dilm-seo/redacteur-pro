export interface WritingStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface AIConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface PersonaConfig {
  tone: string;
  expertise: string;
  audience: string;
  customInstructions: string;
}

export interface SeoConfig {
  targetKeywords: string[];
  locale: string;
  contentType: string;
  targetLength: number;
  competitorUrls: string[];
  metaDescription: string;
  focusKeyphrase: string;
  secondaryKeywords: string[];
}