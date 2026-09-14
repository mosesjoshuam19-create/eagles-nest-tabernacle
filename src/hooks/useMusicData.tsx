
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MusicCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  track_count?: number;
}

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  category_id: string;
  date_recorded: string;
  music_categories: {
    title: string;
  };
}

interface PracticeSchedule {
  id: string;
  day_of_week: number;
  time: string;
  group_name: string;
  location: string;
  duration_minutes: number;
}

interface MusicOpportunity {
  id: string;
  title: string;
  description: string;
  requirements: string;
  contact_info: string;
}

export const useMusicData = () => {
  const [musicCategories, setMusicCategories] = useState<MusicCategory[]>([]);
  const [recentTracks, setRecentTracks] = useState<MusicTrack[]>([]);
  const [practiceSchedule, setPracticeSchedule] = useState<PracticeSchedule[]>([]);
  const [musicOpportunities, setMusicOpportunities] = useState<MusicOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMusicData();
  }, []);

  const fetchMusicData = async () => {
    try {
      setLoading(true);

      // Fetch music categories with track counts
      const { data: categories, error: categoriesError } = await supabase
        .from('music_categories')
        .select(`
          id,
          title,
          description,
          icon,
          music_tracks!inner(id)
        `)
        .eq('is_active', true);

      if (categoriesError) throw categoriesError;

      // Process categories with track counts
      const categoriesWithCounts = categories?.map(category => ({
        id: category.id,
        title: category.title,
        description: category.description || '',
        icon: category.icon || 'music',
        track_count: category.music_tracks?.length || 0
      })) || [];

      setMusicCategories(categoriesWithCounts);

      // Fetch recent music tracks
      const { data: tracks, error: tracksError } = await supabase
        .from('music_tracks')
        .select(`
          id,
          title,
          artist,
          duration,
          category_id,
          date_recorded,
          music_categories(title)
        `)
        .eq('is_published', true)
        .order('date_recorded', { ascending: false })
        .limit(4);

      if (tracksError) throw tracksError;
      setRecentTracks(tracks || []);

      // Fetch practice schedules
      const { data: schedules, error: schedulesError } = await supabase
        .from('practice_schedules')
        .select('*')
        .eq('is_active', true)
        .order('day_of_week');

      if (schedulesError) throw schedulesError;
      setPracticeSchedule(schedules || []);

      // Fetch music ministry opportunities
      const { data: opportunities, error: opportunitiesError } = await supabase
        .from('music_ministry_opportunities')
        .select('*')
        .eq('is_active', true);

      if (opportunitiesError) throw opportunitiesError;
      setMusicOpportunities(opportunities || []);

    } catch (error) {
      console.error('Error fetching music data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    musicCategories,
    recentTracks,
    practiceSchedule,
    musicOpportunities,
    loading
  };
};
