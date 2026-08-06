import React from 'react';
import { Home, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ErrorPage({ 
  errorCode = "404", 
  title = "Page Not Found", 
  message = "Sorry, the page you are looking for doesn't exist or has been moved."
}) {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 select-none relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Glow Badge & Icon */}
        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-6 shadow-lg shadow-indigo-500/5">
          <AlertTriangle className="w-10 h-10 text-indigo-400" />
        </div>

        {/* Big Code */}
        <h1 className="text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">
          {errorCode}
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-3">
          {title}
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-base mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={()=>navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>

          <button
            onClick={()=>navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-200 font-medium rounded-xl transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={()=>window.location.reload()}
            className="inline-flex items-center justify-center p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-400 hover:text-slate-200 font-medium rounded-xl transition-all duration-200 active:scale-95"
            title="Refresh Page"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}