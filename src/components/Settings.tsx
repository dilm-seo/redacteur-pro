import React from 'react';
import { AIConfig, PersonaConfig } from '../types';
import { Sliders, Bot, UserCircle } from 'lucide-react';

interface SettingsProps {
  aiConfig: AIConfig;
  setAIConfig: (config: AIConfig) => void;
  personaConfig: PersonaConfig;
  setPersonaConfig: (config: PersonaConfig) => void;
}

export default function Settings({ aiConfig, setAIConfig, personaConfig, setPersonaConfig }: SettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Configuration IA</h2>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Clé API OpenAI</label>
            <input
              type="password"
              value={aiConfig.apiKey}
              onChange={(e) => setAIConfig({ ...aiConfig, apiKey: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Modèle</label>
            <select
              value={aiConfig.model}
              onChange={(e) => setAIConfig({ ...aiConfig, model: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tokens Maximum ({aiConfig.maxTokens})
            </label>
            <input
              type="range"
              min="100"
              max="4000"
              value={aiConfig.maxTokens}
              onChange={(e) => setAIConfig({ ...aiConfig, maxTokens: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Température ({aiConfig.temperature})
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={aiConfig.temperature}
              onChange={(e) => setAIConfig({ ...aiConfig, temperature: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Personnalisation</h2>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ton</label>
            <select
              value={personaConfig.tone}
              onChange={(e) => setPersonaConfig({ ...personaConfig, tone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="formal">Formel</option>
              <option value="casual">Décontracté</option>
              <option value="friendly">Amical</option>
              <option value="authoritative">Autoritaire</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Niveau d'expertise</label>
            <select
              value={personaConfig.expertise}
              onChange={(e) => setPersonaConfig({ ...personaConfig, expertise: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Public cible</label>
            <select
              value={personaConfig.audience}
              onChange={(e) => setPersonaConfig({ ...personaConfig, audience: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="general">Grand public</option>
              <option value="professional">Professionnels</option>
              <option value="technical">Technique</option>
              <option value="academic">Académique</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Instructions personnalisées</label>
            <textarea
              value={personaConfig.customInstructions}
              onChange={(e) => setPersonaConfig({ ...personaConfig, customInstructions: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}