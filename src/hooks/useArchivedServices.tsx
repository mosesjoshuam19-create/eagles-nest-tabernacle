
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ArchivedService {
  id: string;
  title: string;
  service_date: string;
  duration_seconds: number;
  description: string;
  video_url?: string;
  thumbnail_url?: string;
  created_at: string;
}

export const useArchivedServices = () => {
  const [services, setServices] = useState<ArchivedService[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchArchivedServices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('archived_services')
        .select('*')
        .eq('is_published', true)
        .order('service_date', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load archived services",
          variant: "destructive",
        });
      } else {
        setServices(data || []);
      }
    } catch (error) {
      console.error('Error fetching archived services:', error);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void fetchArchivedServices();
  }, [fetchArchivedServices]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    services,
    loading,
    formatDuration
  };
};
