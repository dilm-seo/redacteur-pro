import React, { useState } from 'react';
import { Send, Settings, Wand2 } from 'lucide-react';
import { AIConfig, PersonaConfig, WritingStyle } from '../types';

interface EditorProps {
  onGenerate: (content: string) => Promise<void>;
  aiConfig: AIConfig;
  personaConfig: PersonaConfig;
  selectedStyle: WritingStyle;
}

export default function Editor({ onGenerate, aiConfig, personaConfig, selectedStyle }: EditorProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    await onGenerate(content);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <Wand2 className="w-5 h-5" />
          <span className="font-medium">Style sélectionné: {selectedStyle.name}</span>
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Entrez votre texte ici..."
          className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Modèle: {aiConfig.model} | Max tokens: {aiConfig.maxTokens}
          </div>
          
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Générer
          </button>
        </div>
      </form>
    </div>
  );
}