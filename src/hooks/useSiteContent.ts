import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteContentRecord = {
  id: string;
  page_key: string;
  section_key: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  sort_order: number;
  is_published: boolean;
};

export const useSiteContent = (pageKey: string) => {
  const [content, setContent] = useState<SiteContentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError(false);
    const { data, error: queryError } = await supabase
      .from("site_content")
      .select("*")
      .eq("page_key", pageKey)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (queryError) {
      console.error(`Error loading ${pageKey} site content:`, queryError);
      setError(true);
    } else {
      setContent((data || []) as SiteContentRecord[]);
    }
    setLoading(false);
  }, [pageKey]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  return { content, loading, error, retry: loadContent };
};
