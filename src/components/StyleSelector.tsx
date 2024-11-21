import React from 'react';
import { WritingStyle } from '../types';
import { PenTool } from 'lucide-react';

interface StyleSelectorProps {
  styles: WritingStyle[];
  selectedStyle: WritingStyle;
  onSelectStyle: (style: WritingStyle) => void;
}

export default function StyleSelector({ styles, selectedStyle, onSelectStyle }: StyleSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <PenTool className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Styles d'écriture</h2>
      </div>
      
      <div className="grid gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedStyle.id === style.id
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'border-2 border-gray-200 hover:border-blue-300'
            }`}
          >
            <h3 className="font-medium text-gray-900">{style.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{style.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}