"use client";

import { useState, useEffect, useRef } from "react";
import { Country, State, City } from "country-state-city";
import { FiCopy, FiCheck, FiThumbsUp, FiThumbsDown, FiSave } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast, { Toaster } from "react-hot-toast";
import type { ICountry, IState, ICity } from "country-state-city";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);


  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [recentIdeas, setRecentIdeas] = useState<string[]>([]);
  const [language, setLanguage] = useState<"EN" | "ES">("EN");

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
    setSelectedState("");
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    } else {
      setCities([]);
    }
    setSelectedCity("");
  }, [selectedState]);

  const rateIdea = async () => {
    if (!idea) return toast.error("Please enter your idea!");
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-235b-a22b-07-25:free",
          messages: [
            {
              role: "user",
              content: `Rate this startup idea: ${idea}\nLocation: ${selectedCity}, ${selectedState}, ${selectedCountry}.\nLanguage: ${language}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "Error: No response.";
      setResult(content);
      setRecentIdeas((prev) => [idea, ...prev.slice(0, 4)]);

      // Auto scroll
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    } catch (err) {
      setResult("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 1500);
  };

  if (result) {
    return (
      <main className="min-h-screen bg-[#343541] text-white px-4 py-6">
        <Toaster position="top-right" />
        <button
          className="text-sm mb-4 text-[#10a37f] hover:underline"
          onClick={() => setResult("")}
        >
          ← Back to Home
        </button>

        <h2 className="text-xl font-semibold mb-4">Your Idea Evaluation:</h2>
        <div
          ref={resultRef}
          className="relative bg-[#202123] border border-[#4e4f5c] rounded-lg p-4 max-w-3xl mx-auto prose prose-invert whitespace-pre-wrap"
        >
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 text-gray-300 hover:text-white"
            title="Copy"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>

          <div className="flex gap-3 justify-end mt-4 text-gray-300">
            <button title="Like" className="hover:text-white">
              <FiThumbsUp />
            </button>
            <button title="Dislike" className="hover:text-white">
              <FiThumbsDown />
            </button>
            <button title="Save to Profile (Coming Soon)" className="hover:text-white">
              <FiSave />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-[#343541] px-4"
      style={{ fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif` }}
    >
      <Toaster position="top-right" />
      <h1 className="text-3xl font-semibold text-white mb-8">ideaOrbit</h1>

      <div className="w-full max-w-md flex flex-col gap-4">
        <textarea
          placeholder="Describe your startup idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={3}
          className="bg-[#202123] text-white placeholder-gray-400 border border-[#4e4f5c] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#10a37f]"
        />

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="bg-[#202123] text-white border border-[#4e4f5c] rounded-lg px-4 py-3"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>

        {states.length > 0 && (
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-[#202123] text-white border border-[#4e4f5c] rounded-lg px-4 py-3"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        )}

        {cities.length > 0 && (
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-[#202123] text-white border border-[#4e4f5c] rounded-lg px-4 py-3"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={rateIdea}
            disabled={loading}
            className={`${
              loading ? "bg-[#0e8e6a] cursor-not-allowed" : "bg-[#10a37f] hover:bg-[#0e8e6a]"
            } transition-all text-white py-3 rounded-lg font-medium w-full`}
          >
            {loading ? "Thinking..." : "Rate My Idea"}
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "EN" | "ES")}
            className="ml-4 bg-[#202123] text-white border border-[#4e4f5c] rounded-md px-2 py-1"
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
          </select>
        </div>

        {recentIdeas.length > 0 && (
          <div className="text-sm text-gray-300 mt-2">
            <span className="font-medium text-white">Recent Ideas:</span>
            <ul className="list-disc ml-4 mt-1 space-y-1">
              {recentIdeas.map((text, idx) => (
                <li key={idx}>{text.slice(0, 60)}{text.length > 60 ? "..." : ""}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
