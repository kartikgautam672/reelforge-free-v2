import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateScript() {
    if (!topic.trim()) return alert("Please enter a topic!");
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setResult(data.result || "No response generated.");
    } catch (error) {
      console.error("Error:", error);
      setResult("Error: Unable to generate script. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <span className="text-6xl mb-2 block">🎬</span>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
              ReelForge
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              AI-Powered Reel Script Generator
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Input Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-6 border border-purple-500/30">
            <div className="mb-6">
              <label htmlFor="topic-input" className="block text-sm font-semibold text-purple-300 mb-3">
                Enter Your Reel Topic
              </label>
              <input
                id="topic-input"
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., How to stay motivated during tough times..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && generateScript()}
              />
              <p className="text-xs text-gray-400 mt-2 ml-1">
                Press Enter to generate
              </p>
            </div>

            <button
              onClick={generateScript}
              disabled={loading || !topic.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Your Script...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">✨</span>
                  <span>Generate Script</span>
                </>
              )}
            </button>
          </div>

          {/* Result Card */}
          {result && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 animate-fade-in">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-purple-500/30">
                <span className="text-2xl">🎤</span>
                <h2 className="text-xl md:text-2xl font-bold text-purple-300">
                  Your AI-Generated Script
                </h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                  {result}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    alert('Copied to clipboard!');
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Script
                </button>
                <button
                  onClick={() => setResult('')}
                  className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          {!result && (
            <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <span>💡</span>
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Be specific about your topic for better results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Include your niche or target audience if relevant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Add tone preferences (motivational, funny, educational)</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12">
        <div className="text-center text-gray-400 text-sm">
          <p>Powered by AI • Made with 💜 for Content Creators</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

