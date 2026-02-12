
import React, { useState } from 'react';
import { CheckIn } from '../types';
import { MOOD_EMOJIS } from '../constants';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Info } from 'lucide-react';

interface MoodCalendarProps {
  checkIns: CheckIn[];
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ checkIns }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<CheckIn | null>(null);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const numDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const getCheckInForDay = (day: number) => {
    return checkIns.find(ci => {
      const d = new Date(ci.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[40px] p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">{monthNames[month]} {year}</h2>
          <div className="flex gap-2">
            <button onClick={() => changeMonth(-1)} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-2xl hover:bg-slate-100 transition-all">
              <ChevronLeft />
            </button>
            <button onClick={() => changeMonth(1)} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-2xl hover:bg-slate-100 transition-all">
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24" />
          ))}
          {Array.from({ length: numDays }).map((_, i) => {
            const dayNum = i + 1;
            const ci = getCheckInForDay(dayNum);
            return (
              <button 
                key={dayNum}
                onClick={() => ci && setSelectedDay(ci)}
                className={`h-24 rounded-3xl flex flex-col items-center justify-center gap-1 transition-all relative group ${
                  ci 
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 hover:scale-105 shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className={`text-sm font-bold ${ci ? 'text-primary-600' : 'text-slate-400'}`}>{dayNum}</span>
                {ci && (
                  <div className="text-2xl animate-in zoom-in duration-300">
                    {MOOD_EMOJIS[ci.mood]}
                  </div>
                )}
                {ci?.mediaUrl && (
                  <div className="absolute top-2 right-2 text-primary-400">
                    <ImageIcon size={12} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[40px] p-10 border border-slate-100 dark:border-slate-700 shadow-sm h-fit">
        {selectedDay ? (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Day Review</h3>
              <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-slate-600 font-bold">Close</button>
            </div>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-3xl flex items-center justify-center text-5xl">
                {MOOD_EMOJIS[selectedDay.mood]}
              </div>
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase mb-1">{new Date(selectedDay.date).toDateString()}</p>
                <h4 className="text-2xl font-bold">{selectedDay.mood}</h4>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-[32px] italic text-slate-600 dark:text-slate-300 leading-relaxed">
                "{selectedDay.description || "No thoughts recorded for this day."}"
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-indigo-400 mb-1">Sleep</p>
                  <p className="font-bold">{selectedDay.sleepHours} hrs • {selectedDay.sleepQuality}</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-amber-500 mb-1">Energy</p>
                  <p className="font-bold">{selectedDay.energyLevel}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Factors</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDay.factors.map(f => (
                    <span key={f} className="px-3 py-1 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-full text-xs font-bold">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <Info size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-400 italic">Select a marked date to see your mood journey for that day.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodCalendar;
