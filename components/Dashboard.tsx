
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { User, CheckIn, Mood } from '../types';
import { MOOD_EMOJIS } from '../constants';
import { TrendingUp, Moon, Zap, Calendar, Heart } from 'lucide-react';

interface DashboardProps {
  user: User;
  checkIns: CheckIn[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, checkIns }) => {
  const latestCheckIn = checkIns[0];

  // Prepare data for line chart (mood over time)
  // We'll map moods to numbers: Happy: 5, Calm: 4, Stressed: 3, Anxious: 2, Lonely: 1, Sad: 0
  const moodScoreMap: Record<Mood, number> = {
    [Mood.HAPPY]: 5,
    [Mood.CALM]: 4,
    [Mood.STRESSED]: 2,
    [Mood.ANXIOUS]: 1,
    [Mood.LONELY]: 1,
    [Mood.OVERWHELMED]: 2,
    [Mood.SAD]: 0
  };

  const chartData = [...checkIns].reverse().map(ci => ({
    date: new Date(ci.date).toLocaleDateString(undefined, { weekday: 'short' }),
    score: moodScoreMap[ci.mood] || 3,
    hours: ci.sleepHours
  }));

  const moodCounts = checkIns.reduce((acc, ci) => {
    acc[ci.mood] = (acc[ci.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    count
  }));

  const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'];

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Current Streak</p>
              <h4 className="text-2xl font-bold">{checkIns.length} Days</h4>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-primary-500 h-full w-[60%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600">
              <Moon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Avg Sleep</p>
              <h4 className="text-2xl font-bold">7.5 hrs</h4>
            </div>
          </div>
          <p className="text-xs text-green-500 font-medium">+12% from last week</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-soft-pink dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-500">
              <Heart size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Dominant Mood</p>
              <h4 className="text-2xl font-bold">{checkIns[0]?.mood || 'Calm'}</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500">Based on last 7 entries</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Next Milestone</p>
              <h4 className="text-2xl font-bold">1 Month</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500">30 days of mindful growth</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trend */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Mood Trends</h3>
            <select className="bg-slate-50 dark:bg-slate-700 border-none rounded-xl text-sm px-4 py-2 font-medium">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  dy={10}
                />
                <YAxis hide domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0ea5e9" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#0ea5e9', strokeWidth: 3, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep and Correlation */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Sleep Habits</h3>
            <div className="flex items-center gap-2 text-primary-500 font-bold text-sm">
              <Moon size={16} />
              <span>Target: 8h</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="hours" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hours >= 7 ? '#10b981' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Recent Check-ins</h3>
        <div className="space-y-4">
          {checkIns.map(ci => (
            <div key={ci.id} className="flex items-center gap-6 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-all">
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                {MOOD_EMOJIS[ci.mood]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-lg">{ci.mood}</h4>
                  <span className="text-slate-400 text-xs">{new Date(ci.date).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1 italic">"{ci.description}"</p>
                <div className="flex gap-2 mt-2">
                  {ci.factors.map(f => (
                    <span key={f} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] rounded-full font-bold uppercase tracking-widest">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {checkIns.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No check-ins yet. Start by checking in today!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
