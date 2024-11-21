import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AIConfig, PersonaConfig, WritingStyle, SeoConfig } from './types';
import { writingStyles } from './config/writingStyles';
import Editor from './components/Editor';
import Settings from './components/Settings';
import StyleSelector from './components/StyleSelector';
import Output from './components/Output';
import SeoOptimizer from './components/SeoOptimizer';
import { PenSquare, LayoutGrid, Search } from 'lucide-react';

export default function App() {
  const [aiConfig, setAIConfig] = useState<AIConfig>({
    apiKey: '',
    model: 'gpt-4',
    maxTokens: 2000,
    temperature: 0.7,
  });

  const [personaConfig, setPersonaConfig] = useState<PersonaConfig>({
    tone: 'formal',
    expertise: 'intermediate',
    audience: 'professional',
    customInstructions: '',
  });

  const [seoConfig, setSeoConfig] = useState<SeoConfig>({
    targetKeywords: [],
    locale: 'fr-FR',
    contentType: 'article',
    targetLength: 1000,
    competitorUrls: [],
    metaDescription: '',
    focusKeyphrase: '',
    secondaryKeywords: [],
  });

  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>(writingStyles[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [activeTab, setActiveTab] = useState<'write' | 'seo'>('write');

  const handleGenerate = async (content: string) => {
    if (!aiConfig.apiKey) {
      toast.error('Veuillez configurer votre clé API OpenAI');
      return;
    }

    try {
      toast.loading('Génération en cours...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: aiConfig.model,
          messages: [
            {
              role: 'system',
              content: `Vous êtes un assistant d'écriture professionnel.
                       Ton: ${personaConfig.tone}
                       Niveau d'expertise: ${personaConfig.expertise}
                       Public cible: ${personaConfig.audience}
                       Instructions supplémentaires: ${personaConfig.customInstructions}
                       Style: ${selectedStyle.prompt}
                       SEO - Expression clé: ${seoConfig.focusKeyphrase}
                       SEO - Mots-clés cibles: ${seoConfig.targetKeywords.join(', ')}
                       SEO - Type de contenu: ${seoConfig.contentType}
                       SEO - Longueur cible: ${seoConfig.targetLength} mots`
            },
            {
              role: 'user',
              content: content
            }
          ],
          max_tokens: aiConfig.maxTokens,
          temperature: aiConfig.temperature,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      setGeneratedContent(data.choices[0].message.content);
      toast.success('Contenu généré avec succès!');
    } catch (error) {
      toast.error('Erreur lors de la génération: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PenSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Assistant de Rédaction IA</h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('write')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'write'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
                Rédaction
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'seo'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Search className="w-5 h-5" />
                SEO
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Editor
              onGenerate={handleGenerate}
              aiConfig={aiConfig}
              personaConfig={personaConfig}
              selectedStyle={selectedStyle}
            />
            <Output content={generatedContent} />
          </div>
          
          <div className="space-y-8">
            {activeTab === 'write' ? (
              <>
                <StyleSelector
                  styles={writingStyles}
                  selectedStyle={selectedStyle}
                  onSelectStyle={setSelectedStyle}
                />
                <Settings
                  aiConfig={aiConfig}
                  setAIConfig={setAIConfig}
                  personaConfig={personaConfig}
                  setPersonaConfig={setPersonaConfig}
                />
              </>
            ) : (
              <SeoOptimizer
                seoConfig={seoConfig}
                onSeoConfigChange={setSeoConfig}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}