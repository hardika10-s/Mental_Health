
import React, { useState, useEffect } from 'react';
import { User, CheckIn, Resource, Mood } from '../types';
import { MOCK_RESOURCES } from '../constants';
import { getDynamicRecommendations } from '../geminiService';
import { Heart, Play, BookOpen, Music, Film, ExternalLink, Sparkles } from 'lucide-react';

interface ResourcesProps {
  user: User;
  onSave: (id: string) => void;
  savedIds: string[];
  checkIns: CheckIn[];
}

const Resources: React.FC<ResourcesProps> = ({ user, onSave, savedIds, checkIns }) => {
  const [filter, setFilter] = useState<'all' | 'article' | 'video' | 'movie' | 'song'>('all');
  const [aiTips, setAiTips] = useState<any[]>([]);
  const latestMood = checkIns[0]?.mood || Mood.CALM;
  const latestFactors = checkIns[0]?.factors || [];

  useEffect(() => {
    const fetchTips = async () => {
      if (checkIns.length > 0) {
        const tips = await getDynamicRecommendations(latestMood, latestFactors);
        setAiTips(tips);
      }
    };
    fetchTips();
  }, [checkIns, latestMood, latestFactors]);

  const filteredResources = MOCK_RESOURCES.filter(r => 
    (filter === 'all' || r.type === filter) &&
    (r.moodTags.includes(latestMood) || r.language === user.preferredLanguage || r.type !== 'movie')
  );

  return (
    <div className="space-y-12">
      {/* AI Recommendation Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-primary-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={24} className="text-yellow-300" />
            <span className="uppercase tracking-widest font-bold text-sm text-indigo-100">AI Personal Recommendations</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Because you're feeling <span className="text-yellow-300 italic">{latestMood}</span> today...
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {aiTips.length > 0 ? aiTips.map((tip, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/20 transition-all cursor-default group">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase mb-3">{tip.type}</span>
                <h4 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">{tip.title}</h4>
                <p className="text-indigo-100 text-sm italic">{tip.reason}</p>
              </div>
            )) : (
              <div className="col-span-3 py-6 text-indigo-100 animate-pulse font-medium">
                Analyzing your mood to curate the best experience...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resource Filtering */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h3 className="text-2xl font-bold">Recommended for You</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'all', label: 'All', icon: <Sparkles size={16} /> },
              { id: 'article', label: 'Articles', icon: <BookOpen size={16} /> },
              { id: 'video', label: 'Videos', icon: <Play size={16} fill="currentColor" /> },
              { id: 'movie', label: 'Movies', icon: <Film size={16} /> },
              { id: 'song', label: 'Music', icon: <Music size={16} /> },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id as any)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                  filter === type.id 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700'
                }`}
              >
                {type.icon}
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredResources.map(resource => (
            <div key={resource.id} className="group bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={resource.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={resource.title} 
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {resource.category}
                </div>
                <button 
                  onClick={() => onSave(resource.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${
                    savedIds.includes(resource.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-slate-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={18} fill={savedIds.includes(resource.id) ? "white" : "none"} />
                </button>
                {resource.type === 'video' || resource.type === 'movie' ? (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-primary-500/90 text-white rounded-full flex items-center justify-center shadow-xl">
                      <Play size={28} fill="white" />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3">
                  {resource.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase text-slate-400">#{tag}</span>
                  ))}
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors leading-tight">{resource.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 italic leading-relaxed">
                  "{resource.description}"
                </p>
                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {resource.type === 'video' && <Play size={16} className="text-red-500" />}
                    {resource.type === 'article' && <BookOpen size={16} className="text-blue-500" />}
                    {resource.type === 'song' && <Music size={16} className="text-indigo-500" />}
                    {resource.type === 'movie' && <Film size={16} className="text-amber-500" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{resource.type}</span>
                  </div>
                  <a 
                    href={resource.url || "#"} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-primary-500 font-bold text-sm hover:translate-x-1 transition-transform"
                  >
                    Explore
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
