
export enum Mood {
  HAPPY = 'Happy',
  CALM = 'Calm',
  STRESSED = 'Stressed',
  ANXIOUS = 'Anxious',
  LONELY = 'Lonely',
  OVERWHELMED = 'Overwhelmed',
  SAD = 'Sad'
}

export enum SleepQuality {
  VERY_GOOD = 'Very Good',
  OKAY = 'Okay',
  POOR = 'Poor'
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferredLanguage: string;
}

export interface CheckIn {
  id: string;
  date: string;
  mood: Mood;
  description: string;
  sleepQuality: SleepQuality;
  sleepHours: number;
  factors: string[];
  energyLevel: 'High' | 'Medium' | 'Low';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'movie' | 'song';
  category: string;
  thumbnail: string;
  tags: string[];
  url?: string;
  moodTags: Mood[];
  language?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
