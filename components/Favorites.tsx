
import React from 'react';
import { MOCK_RESOURCES } from '../constants';
import { Heart, Play, BookOpen, Music, Film, ExternalLink, Trash2 } from 'lucide-react';

interface FavoritesProps {
  onSave: (id: string) => void;
  savedIds: string[];
}

const Favorites: React.FC<FavoritesProps> = ({ onSave, savedIds }) => {
  const favoriteResources = MOCK_RESOURCES.filter(r => savedIds.includes(r.id));

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Your Saved Peace</h2>
          <p className="text-slate-500 dark:text-slate-400">Content you've bookmarked for later.</p>
        </div>
        <div className="bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-2xl flex items-center gap-2 text-red-500 font-bold">
          <Heart size={20} fill="currentColor" />
          {favoriteResources.length} Items
        </div>
      </div>

      {favoriteResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteResources.map(resource => (
            <div key={resource.id} className="group bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={resource.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={resource.title} 
                />
                <button 
                  onClick={() => onSave(resource.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-900/90 text-red-500 rounded-full backdrop-blur-md hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors leading-tight">{resource.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 italic leading-relaxed">
                  "{resource.description}"
                </p>
                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {resource.type === 'video' && <Play size={16} className="text-red-500" />}
                    {resource.type === 'article' && <BookOpen size={16} className="text-blue-500" />}
                    {resource.type === 'song' && <Music size={16} className="text-indigo-500" />}
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
      ) : (
        <div className="bg-white dark:bg-slate-800 p-20 rounded-[40px] text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Heart size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-400 mb-2">Nothing saved yet</h3>
          <p className="text-slate-400 max-w-sm mx-auto">Browse the Resource portal and save articles, music, or videos that resonate with you.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
