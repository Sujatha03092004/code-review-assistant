"use client";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

import { useState } from "react";

const LANGUAGES = ["python", "javascript", "typescript", "java", "cpp", "go", "rust"];

export default function CodeReviewer() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Detect language from file extension
      const extension = file.name.split(".").pop()?.toLowerCase();
      const extensionMap: Record<string, string> = {
          py: "python",
          js: "javascript",
          ts: "typescript",
          java: "java",
          cpp: "cpp",
          go: "go",
          rs: "rust"
      };

      const detectedLanguage = extensionMap[extension || ""] || "python";
      setLanguage(detectedLanguage);

      // Read file contents
      const reader = new FileReader();
      reader.onload = (event) => {
          const content = event.target?.result as string;
          setCode(content);
      };
      reader.readAsText(file);
  };

  const handleReview = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    setError("");
    setReview("");

    try {
      const response = await fetch(`${API_URL}/api/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language })
      });

      if (!response.ok) throw new Error("Review failed");

      const data = await response.json();
      setReview(data.review);
    } catch (err) {
      setError("Something went wrong. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-2 text-white">
        Code Review Assistant
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Paste your code and get instant AI feedback
      </p>

      {/* Language Selector */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm mb-2 block">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div className="mb-4">
          <label className="text-gray-300 text-sm mb-2 block">
              Upload File
          </label>
          <label className="flex items-center gap-2 cursor-pointer w-fit 
                            bg-gray-800 hover:bg-gray-700 text-gray-300 
                            border border-gray-700 border-dashed rounded-lg 
                            px-4 py-3 transition-colors duration-200">
              <span>📁 Choose File</span>
              <span className="text-gray-500 text-xs">(.py .js .ts .java .cpp .go .rs)</span>
              <input
                  type="file"
                  accept=".py,.js,.ts,.java,.cpp,.go,.rs"
                  onChange={handleFileUpload}
                  className="hidden"
              />
          </label>
      </div>
      
      {/* Code Input */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm mb-2 block">Your Code</label>
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="Paste your code here..."
          rows={12}
          className="w-full bg-gray-800 text-green-400 border border-gray-700 
                     rounded-lg p-4 font-mono text-sm resize-none focus:outline-none 
                     focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleReview}
        disabled={loading || !code.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 
                   disabled:cursor-not-allowed text-white font-semibold py-3 
                   rounded-lg transition-colors duration-200"
      >
        {loading ? "Reviewing..." : "Review My Code"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-900 border border-red-700 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {/* Review Output */}
      {review && (
        <div className="mt-6">
          <label className="text-gray-300 text-sm mb-2 block">AI Review</label>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 
                          text-gray-300 whitespace-pre-wrap font-mono text-sm">
            {review}
          </div>
        </div>
      )}
    </div>
  );
}