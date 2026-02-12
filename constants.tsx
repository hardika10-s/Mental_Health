
import React from 'react';
import { 
  Smile, 
  Meh, 
  Frown, 
  CloudRain, 
  Zap, 
  Moon, 
  Sun,
  Layout,
  BookOpen,
  Video,
  Music,
  Calendar,
  Settings,
  Heart,
  MessageCircle,
  BarChart2,
  Bell
} from 'lucide-react';
import { Mood, Resource } from './types';

export const LANGUAGES = ['English', 'Tamil', 'Hindi', 'Spanish', 'French', 'German'];

export const MOOD_EMOJIS: Record<string, React.ReactNode> = {
  [Mood.HAPPY]: <Smile className="text-yellow-500" />,
  [Mood.CALM]: <Sun className="text-blue-400" />,
  [Mood.STRESSED]: <Zap className="text-orange-500" />,
  [Mood.ANXIOUS]: <CloudRain className="text-indigo-400" />,
  [Mood.LONELY]: <Moon className="text-slate-400" />,
  [Mood.OVERWHELMED]: <Meh className="text-purple-500" />,
  [Mood.SAD]: <Frown className="text-blue-500" />
};

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: '5-Minute Mindfulness Meditation',
    description: 'A quick guide to bring your awareness back to the present moment.',
    type: 'video',
    category: 'Mindfulness',
    thumbnail: 'https://picsum.photos/seed/meditate1/400/225',
    tags: ['Meditation', 'Relaxation'],
    moodTags: [Mood.CALM, Mood.STRESSED, Mood.OVERWHELMED],
    url: 'https://www.youtube.com/watch?v=inpok4MKVLM'
  },
  {
    id: '2',
    title: 'Coping with Academic Pressure',
    description: 'Strategies for students to manage stress during exams and assignments.',
    type: 'article',
    category: 'Stress Management',
    thumbnail: 'https://picsum.photos/seed/study1/400/225',
    tags: ['Student Life', 'Stress'],
    moodTags: [Mood.STRESSED, Mood.OVERWHELMED],
  },
  {
    id: '3',
    title: 'The Power of Vulnerability',
    description: 'Brené Brown discusses how vulnerability is the key to connection.',
    type: 'video',
    category: 'Motivation',
    thumbnail: 'https://picsum.photos/seed/ted1/400/225',
    tags: ['Confidence', 'Emotion'],
    moodTags: [Mood.LONELY, Mood.SAD, Mood.ANXIOUS],
  },
  {
    id: '4',
    title: 'Weightless - Marconi Union',
    description: 'Statistically the most relaxing song ever recorded.',
    type: 'song',
    category: 'Relaxation Music',
    thumbnail: 'https://picsum.photos/seed/song1/400/225',
    tags: ['Ambient', 'Sleep'],
    moodTags: [Mood.ANXIOUS, Mood.CALM],
    language: 'English'
  },
  {
    id: '5',
    title: 'The Internal Sunshine',
    description: 'A feel-good story about finding joy in small things.',
    type: 'movie',
    category: 'Feel-good',
    thumbnail: 'https://picsum.photos/seed/movie1/400/225',
    tags: ['Inspiring', 'Happy'],
    moodTags: [Mood.HAPPY, Mood.SAD],
    language: 'Tamil'
  }
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Layout size={20} /> },
  { id: 'checkin', label: 'Check-in', icon: <Smile size={20} /> },
  { id: 'resources', label: 'Resources', icon: <BookOpen size={20} /> },
  { id: 'chatbot', label: 'Companion', icon: <MessageCircle size={20} /> },
  { id: 'calendar', label: 'Mood Log', icon: <Calendar size={20} /> },
  { id: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
];

export const AFFIRMATIONS = [
  "You are capable of handling whatever this day throws at you.",
  "Your mistakes don't define your value.",
  "It's okay to take a break and breathe.",
  "You are worthy of love, especially from yourself.",
  "Small progress is still progress.",
  "Your feelings are valid, even if they're difficult."
];
