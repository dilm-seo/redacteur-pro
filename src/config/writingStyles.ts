import { WritingStyle } from '../types';

export const writingStyles: WritingStyle[] = [
  {
    id: 'professional',
    name: 'Professionnel',
    description: 'Style formel et professionnel, parfait pour la communication d\'entreprise',
    prompt: 'Rédigez ce contenu dans un style professionnel et formel, en utilisant un vocabulaire précis et approprié au monde des affaires.'
  },
  {
    id: 'academic',
    name: 'Académique',
    description: 'Style académique pour les publications scientifiques et universitaires',
    prompt: 'Rédigez ce contenu dans un style académique rigoureux, avec des références appropriées et un vocabulaire spécialisé.'
  },
  {
    id: 'journalistic',
    name: 'Journalistique',
    description: 'Style journalistique clair et factuel',
    prompt: 'Rédigez ce contenu dans un style journalistique objectif et factuel, en suivant la structure pyramidale inversée.'
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Style créatif et engageant pour le storytelling',
    prompt: 'Rédigez ce contenu de manière créative et engageante, en utilisant des techniques narratives et un vocabulaire évocateur.'
  },
  {
    id: 'technical',
    name: 'Technique',
    description: 'Style technique pour la documentation et les guides',
    prompt: 'Rédigez ce contenu dans un style technique précis, avec une attention particulière aux détails et aux instructions étape par étape.'
  }
];