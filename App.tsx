
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Heart, 
  Settings, 
  Bell, 
  User as UserIcon, 
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { User, CheckIn, Mood, SleepQuality, ChatMessage } from './types';
import { NAV_ITEMS, MOCK_RESOURCES, AFFIRMATIONS } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import MoodCheckIn from './components/MoodCheckIn';
import Resources from './components/Resources';
import Chatbot from './components/Chatbot';
import MoodCalendar from './components/MoodCalendar';
import Favorites from './components/Favorites';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showAffirmation, setShowAffirmation] = useState(true);
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
    
    // Simulate initial data
    const mockCheckIns: CheckIn[] = [
      {
        id: '1',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        mood: Mood.CALM,
        description: 'Feeling alright today.',
        sleepQuality: SleepQuality.VERY_GOOD,
        sleepHours: 8,
        factors: ['Family'],
        energyLevel: 'Medium'
      },
      {
        id: '2',
        date: new Date(Date.now() - 86400000 * 1).toISOString(),
        mood: Mood.HAPPY,
        description: 'Great day at work!',
        sleepQuality: SleepQuality.OKAY,
        sleepHours: 7,
        factors: ['Studies / Work'],
        energyLevel: 'High'
      }
    ];
    setCheckIns(mockCheckIns);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setNotifications([`Welcome back, ${userData.name}! Ready for today's check-in?`]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNewCheckIn = (checkIn: CheckIn) => {
    setCheckIns(prev => [checkIn, ...prev]);
    setCurrentPage('dashboard');
    setNotifications(prev => [`Thanks for checking in! 🌱`, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setSavedResourceIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (!user) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard user={user} checkIns={checkIns} />;
      case 'checkin': return <MoodCheckIn user={user} onSubmit={handleNewCheckIn} />;
      case 'resources': return <Resources user={user} onSave={toggleFavorite} savedIds={savedResourceIds} checkIns={checkIns} />;
      case 'chatbot': return <Chatbot user={user} latestMood={checkIns[0]?.mood} />;
      case 'calendar': return <MoodCalendar checkIns={checkIns} />;
      case 'favorites': return <Favorites onSave={toggleFavorite} savedIds={savedResourceIds} />;
      default: return <Dashboard user={user} checkIns={checkIns} />;
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Sidebar - Persistent */}
      <aside className={`w-20 md:w-64 flex flex-col border-r fixed h-full z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Heart size={24} fill="white" />
          </div>
          <span className="text-xl font-bold hidden md:block tracking-tight">MindEase</span>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                currentPage === item.id 
                ? 'bg-primary-500 text-white shadow-md' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {item.icon}
              <span className="font-medium hidden md:block">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setUser(null)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium hidden md:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8 sticky top-0 bg-opacity-80 backdrop-blur-md z-40 py-2">
          <div>
            <h1 className="text-2xl font-bold">Hello, {user.name} 👋</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">How is your heart feeling today?</p>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative group cursor-pointer">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
                {notifications.length}
              </div>
              <Bell className="text-slate-500 dark:text-slate-400" size={24} />
            </div>

            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 bg-primary-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-primary-600">
                <UserIcon size={20} />
              </div>
              <div className="hidden lg:block text-right">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">{user.preferredLanguage}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Daily Affirmation Card */}
        {showAffirmation && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-primary-100 to-indigo-100 dark:from-slate-800 dark:to-indigo-950 border border-primary-200 dark:border-primary-900/30 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-top duration-700">
            <button 
              onClick={() => setShowAffirmation(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                ✨
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-800 dark:text-primary-300 mb-1">Daily Affirmation</h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg font-medium italic">"{affirmation}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>

        {/* Safety Footer / Disclaimer */}
        <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-4 items-start p-6 bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-100 dark:border-red-900/30">
              <PhoneCall className="text-red-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-red-600 mb-2 uppercase tracking-wide text-sm">Need immediate help?</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  If you are in immediate danger or feeling suicidal, please contact a helpline right away.
                </p>
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-200">Global: 988 (Suicide & Crisis Lifeline)</p>
                  <p className="font-medium text-slate-600 dark:text-slate-400 text-xs">Available 24/7 in multiple languages.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="text-primary-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide text-sm">Privacy & Medical Disclaimer</h4>
                <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed">
                  MindEase is a digital self-care tool. It does not provide medical diagnosis, treatment, or therapy. 
                  All your data is stored locally in this academic demonstration and is not shared with third parties. 
                  Always consult a qualified healthcare professional for mental health concerns.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
