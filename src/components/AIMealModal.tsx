// src/components/AIMealModal.tsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Sparkles, Loader2, X } from 'lucide-react';
import { getMealRecommendation } from '../utils/openaiService';

interface AIMealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIMealModal({ isOpen, onClose }: AIMealModalProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string[]>([]);

  const handleAskAI = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResponse([]);
    try {
      const res = await getMealRecommendation(input);
      setResponse(res);
    } catch (err) {
      setResponse(['Sorry, something went wrong. Try again later.']);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleAskAI();
    }
  };

  const handleClose = () => {
    setInput('');
    setResponse([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              Ask AI for Meal Ideas
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="What are you in the mood for?"
              className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            
            <button
              onClick={handleAskAI}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Getting meal ideas...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Get Meal Ideas
                </>
              )}
            </button>
          </div>

          {response.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="font-medium text-gray-800">AI Suggestions:</h3>
              {response.map((item, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}