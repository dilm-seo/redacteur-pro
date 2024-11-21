import React, { useState } from 'react';
import { Search, Target, Globe2, Link, Plus, X } from 'lucide-react';
import { SeoConfig } from '../types';

interface SeoOptimizerProps {
  onSeoConfigChange: (config: SeoConfig) => void;
  seoConfig: SeoConfig;
}

export default function SeoOptimizer({ onSeoConfigChange, seoConfig }: SeoOptimizerProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');

  const addKeyword = () => {
    if (newKeyword.trim() && !seoConfig.targetKeywords.includes(newKeyword.trim())) {
      onSeoConfigChange({
        ...seoConfig,
        targetKeywords: [...seoConfig.targetKeywords, newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    onSeoConfigChange({
      ...seoConfig,
      targetKeywords: seoConfig.targetKeywords.filter(k => k !== keyword)
    });
  };

  const addCompetitorUrl = () => {
    if (newCompetitorUrl.trim() && !seoConfig.competitorUrls.includes(newCompetitorUrl.trim())) {
      onSeoConfigChange({
        ...seoConfig,
        competitorUrls: [...seoConfig.competitorUrls, newCompetitorUrl.trim()]
      });
      setNewCompetitorUrl('');
    }
  };

  const removeCompetitorUrl = (url: string) => {
    onSeoConfigChange({
      ...seoConfig,
      competitorUrls: seoConfig.competitorUrls.filter(u => u !== url)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Optimisation SEO</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Expression clé principale</label>
          <input
            type="text"
            value={seoConfig.focusKeyphrase}
            onChange={(e) => onSeoConfigChange({ ...seoConfig, focusKeyphrase: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ex: assistant rédaction ia"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Meta Description</label>
          <textarea
            value={seoConfig.metaDescription}
            onChange={(e) => onSeoConfigChange({ ...seoConfig, metaDescription: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
            placeholder="Description qui apparaîtra dans les résultats de recherche..."
          />
          <p className="mt-1 text-sm text-gray-500">
            {seoConfig.metaDescription.length}/160 caractères
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mots-clés cibles</label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ajouter un mot-clé"
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            />
            <button
              onClick={addKeyword}
              className="flex-shrink-0 p-2 text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {seoConfig.targetKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="hover:text-blue-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type de contenu</label>
          <select
            value={seoConfig.contentType}
            onChange={(e) => onSeoConfigChange({ ...seoConfig, contentType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="article">Article de blog</option>
            <option value="product">Page produit</option>
            <option value="landing">Landing page</option>
            <option value="service">Page de service</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longueur cible (mots)</label>
          <input
            type="number"
            value={seoConfig.targetLength}
            onChange={(e) => onSeoConfigChange({ ...seoConfig, targetLength: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="100"
            step="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Langue/Région cible</label>
          <select
            value={seoConfig.locale}
            onChange={(e) => onSeoConfigChange({ ...seoConfig, locale: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="fr-FR">Français (France)</option>
            <option value="fr-BE">Français (Belgique)</option>
            <option value="fr-CH">Français (Suisse)</option>
            <option value="fr-CA">Français (Canada)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URLs des concurrents</label>
          <div className="mt-1 flex gap-2">
            <input
              type="url"
              value={newCompetitorUrl}
              onChange={(e) => setNewCompetitorUrl(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://exemple.com"
              onKeyPress={(e) => e.key === 'Enter' && addCompetitorUrl()}
            />
            <button
              onClick={addCompetitorUrl}
              className="flex-shrink-0 p-2 text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {seoConfig.competitorUrls.map((url) => (
              <div
                key={url}
                className="flex items-center gap-2 p-2 rounded-md bg-gray-50"
              >
                <Link className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 truncate">{url}</span>
                <button
                  onClick={() => removeCompetitorUrl(url)}
                  className="ml-auto text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}