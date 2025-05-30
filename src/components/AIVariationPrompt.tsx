import React, { useState } from 'react';
import { Wand2, Loader2, X } from 'lucide-react';
import { MenuItem } from '../types';

interface AIVariationPromptProps {
  item: MenuItem;
  onClose: () => void;
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

const AIVariationPrompt: React.FC<AIVariationPromptProps> = ({
  item,
  onClose,
  onGenerate,
  isLoading
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const presets = [
    { id: 'keto', label: 'Keto-Friendly', prompt: 'Make it keto-friendly with low carbs' },
    { id: 'vegan', label: 'Vegan', prompt: 'Create a vegan version' },
    { id: 'protein', label: 'High-Protein', prompt: 'Maximize protein while keeping calories low' },
    { id: 'lowCal', label: 'Lower Calorie', prompt: 'Reduce calories while maintaining taste' },
    { id: 'glutenFree', label: 'Gluten-Free', prompt: 'Make it gluten-free' },
    { id: 'mediterranean', label: 'Mediterranean', prompt: 'Adapt to Mediterranean diet' }
  ];

  const handlePresetClick = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await onGenerate(prompt);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Create Custom Variation</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Original Item</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.calories} calories</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Quick Prompts</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset.prompt)}
                  className={`p-3 text-sm rounded-xl transition-colors ${
                    prompt === preset.prompt
                      ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500'
                      : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-medium text-gray-800 mb-2">
                Custom Instructions
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how you'd like to modify this item..."
                className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    Generate Variation
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIVariationPrompt;