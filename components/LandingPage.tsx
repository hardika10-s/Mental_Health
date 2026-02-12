
import React, { useState } from 'react';
import { Heart, ArrowRight, Shield, Star, Users, MessageSquare } from 'lucide-react';
import { User } from '../types';
import { LANGUAGES } from '../constants';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    language: 'English'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: Math.random().toString(),
      name: formData.name || 'Guest User',
      email: formData.email,
      preferredLanguage: formData.language
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100 rounded-full blur-3xl -mr-64 -mt-64 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-soft-pink rounded-full blur-3xl -ml-64 -mb-64 opacity-30"></div>

        <nav className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Heart fill="white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">MindEase</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setView('login')} className="px-6 py-2 font-semibold text-slate-600 hover:text-primary-500 transition-colors">Login</button>
            <button onClick={() => setView('signup')} className="px-6 py-2 bg-primary-500 text-white rounded-full font-bold shadow-lg shadow-primary-200 hover:bg-primary-600 transition-all">Get Started</button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full font-bold text-sm">
                <Star size={16} fill="currentColor" />
                <span>Your Digital Well-being Companion</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1]">
                Mental health <br />
                <span className="text-primary-500">starts with a </span> <br />
                single check-in.
              </h1>
              <p className="text-xl text-slate-500 max-w-lg leading-relaxed italic">
                "Small steps every day lead to a lifetime of calm. MindEase is here to walk that journey with you."
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setView('signup')}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-slate-800 transition-all group"
                >
                  Join the Journey
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-10">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600">
                  <span className="font-bold text-slate-900">10k+</span> members tracking their peace
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 w-full rounded-[40px] overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/seed/mentalhealth/800/800" className="w-full h-[600px] object-cover" alt="Calmness" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <p className="text-white text-xl font-medium">"I feel much more in control of my daily mood since using MindEase. The AI companion is surprisingly gentle."</p>
                    <p className="text-primary-300 mt-2 font-bold">— Sarah, UX Designer</p>
                  </div>
                </div>
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce delay-1000">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">❤️</div>
                  <span className="font-bold">Mood: Calm</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">💧</div>
                  <span className="font-bold">Relaxing Now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-40 grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-[32px] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-slate-500">Your thoughts are private. We use industry-standard encryption for your sensitive mood data.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[32px] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
              <div className="w-14 h-14 bg-soft-pink text-red-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Resource Portal</h3>
              <p className="text-slate-500">Curated articles, videos, and music recommendations tailored to your current emotional state.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[32px] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
              <div className="w-14 h-14 bg-soft-mint text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Companion</h3>
              <p className="text-slate-500">An empathetic AI friend ready to listen and suggest mindfulness exercises anytime you need.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 relative">
        <button 
          onClick={() => setView('landing')}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-6">
            <Heart fill="white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            {view === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 mt-2">
            {view === 'login' ? 'Continue your wellness journey' : 'Start your peaceful journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {view === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="How should we call you?"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              required
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              required
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          {view === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Language</label>
              <select 
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              >
                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
          )}

          <button className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-200 hover:bg-primary-600 transition-all mt-4">
            {view === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500">
          {view === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="text-primary-600 font-bold hover:underline"
          >
            {view === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
