import { useState } from 'react';
import { askOpenAI } from '../utils/openai';

export default function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reply = await askOpenAI(prompt);
      setResponse(reply);
    } catch (error) {
      setResponse('Something went wrong.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleAsk} className="flex flex-col gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Asking...' : 'Ask OpenAI'}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}