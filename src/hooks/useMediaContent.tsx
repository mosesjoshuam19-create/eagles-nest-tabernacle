
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  created_at: string;
}

export const useMediaContent = (mediaType: string) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMediaContent = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('media_content')
        .select('*')
        .eq('media_type', mediaType)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: `Failed to load ${mediaType}s`,
          variant: "destructive",
        });
      } else {
        setItems(data || []);
      }
    } catch (error) {
      console.error(`Error fetching ${mediaType}s:`, error);
    } finally {
      setLoading(false);
    }
  }, [mediaType, toast]);

  useEffect(() => {
    void fetchMediaContent();
  }, [fetchMediaContent]);

  return {
    items,
    loading
  };
};
