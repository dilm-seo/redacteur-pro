import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Download } from 'lucide-react';

interface OutputProps {
  content: string;
}

export default function Output({ content }: OutputProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!content) return null;

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Contenu généré</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}