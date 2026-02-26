import React, { useState, useEffect } from 'react';
import { Video, Mic, Send, Bot, Loader2, Sparkles, AlertCircle, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function VideoAdvisor({ user }: { user: any }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const selected = await window.aistudio.hasSelectedApiKey();
    setHasKey(selected);
  };

  const handleOpenKey = async () => {
    await window.aistudio.openSelectKey();
    setHasKey(true);
  };

  const handleAsk = async (prompt: string) => {
    if (!hasKey) {
      setError("Please select a paid API key to use the Video Advisor.");
      return;
    }

    setIsGenerating(true);
    setVideoUrl(null);
    setError(null);
    
    try {
      // Use the selected API key if available, otherwise fallback to the default
      const apiKey = (process.env as any).API_KEY || process.env.GEMINI_API_KEY || "";
      const ai = new GoogleGenAI({ apiKey });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A professional financial advisor person speaking directly to the camera, explaining: "${prompt}"`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Polling for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10s intervals for Veo
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // To fetch the video, append the Gemini API key to the `x-goog-api-key` header.
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch generated video");
        
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
        setTranscript(`I've analyzed your request regarding "${prompt}". Based on your ${user.role} profile, here is my advice...`);
      }
    } catch (err: any) {
      console.error("Video Gen Error:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("API Key session expired. Please select your key again.");
      } else {
        setError("Failed to generate video. Please try again later.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-10 py-24 font-sans">
        <div className="w-24 h-24 bg-brand-50 text-brand-600 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-brand-100 border border-brand-100">
          <Key className="w-10 h-10" />
        </div>
        <div>
          <span className="section-label">Authentication</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">API Key Required</h2>
          <p className="text-slate-500 mt-4 text-lg leading-relaxed">To use the high-quality Video Advisor, you must select a paid Google Cloud project API key.</p>
          <p className="text-xs text-slate-400 mt-6 font-medium">
            Learn more about <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-brand-600 underline hover:text-brand-700 transition-colors">Gemini API billing</a>.
          </p>
        </div>
        <button 
          onClick={handleOpenKey}
          className="btn-brand px-12 py-5 text-lg shadow-brand-100 mx-auto"
        >
          Select API Key
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 font-sans pb-20">
      <div className="text-center">
        <span className="section-label">Immersive Consultation</span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">AI Video Advisor</h2>
        <p className="text-slate-500 mt-2 text-lg font-medium">Speak to our AI avatar for a more personal financial consultation.</p>
      </div>

      <div className="aspect-video bg-slate-900 rounded-[56px] overflow-hidden shadow-2xl relative border-[12px] border-white group">
        {videoUrl ? (
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-12 relative z-10">
            {isGenerating ? (
              <div className="text-center space-y-6">
                <div className="relative">
                  <Loader2 className="w-16 h-16 animate-spin mx-auto text-brand-400" />
                  <div className="absolute inset-0 blur-xl bg-brand-500/20 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black tracking-tight">Veo AI is crafting your video...</p>
                  <p className="text-slate-400 font-medium">This usually takes 30-60 seconds.</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto backdrop-blur-xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Bot className="w-12 h-12 text-brand-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-black tracking-tight">Ready for your consultation</p>
                  <p className="text-slate-400 text-lg font-medium">Ask a question below to start the video session.</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="absolute top-8 left-8 z-20">
          <div className="px-4 py-2 bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-2.5 shadow-xl shadow-brand-500/20">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Live AI Avatar
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
      </div>

      {error && (
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-[32px] flex items-center gap-4 text-rose-600 shadow-sm">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="font-bold text-sm uppercase tracking-widest">{error}</p>
        </div>
      )}

      {transcript && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Transcript</h4>
            <p className="text-xl text-slate-700 font-medium leading-relaxed italic">"{transcript}"</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl" />
        </motion.div>
      )}

      <div className="bg-white p-4 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/40 flex items-center gap-4 group focus-within:ring-4 focus-within:ring-brand-500/10 transition-all">
        <div className="w-14 h-14 bg-slate-50 rounded-[20px] flex items-center justify-center shrink-0 border border-slate-100 group-focus-within:bg-brand-50 group-focus-within:border-brand-100 transition-all">
          <Mic className="w-6 h-6 text-slate-400 group-focus-within:text-brand-600" />
        </div>
        <input 
          type="text" 
          placeholder="Ask anything about your finances..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 font-bold text-lg placeholder:text-slate-300 px-2"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleAsk((e.target as HTMLInputElement).value);
          }}
        />
        <button 
          onClick={(e) => {
            const input = (e.currentTarget.previousSibling as HTMLInputElement);
            handleAsk(input.value);
          }}
          disabled={isGenerating}
          className="w-14 h-14 bg-brand-600 text-white rounded-[20px] flex items-center justify-center hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 disabled:opacity-50 active:scale-95"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
