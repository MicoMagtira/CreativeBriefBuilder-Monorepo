import { useState } from 'react';

interface SaveSectionResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  saveSection: (section: string, data: Record<string, any>) => Promise<string | null>;
}

export function useSaveBriefSection(): SaveSectionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveSection = async (section: string, data: Record<string, any>): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      let response, result;
      if (section === 'brandInfo' && data.briefId) {
        // PATCH update for BrandInfo
        response = await fetch(`/api/briefs/${data.briefId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        result = await response.json();
      } else {
        // Default to POST for new or other sections
        response = await fetch('/api/briefs/save-section', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section, ...data }),
        });
        result = await response.json();
      }
      if (!response.ok || !result.success) {
        setError(result.error || 'Failed to save section');
        setSuccess(false);
        setLoading(false);
        return null;
      }
      setSuccess(true);
      setLoading(false);
      return result.briefId || data.briefId || null;
    } catch (err) {
      setError((err as Error).message || 'Unknown error');
      setSuccess(false);
      setLoading(false);
      return null;
    }
  };

  return { loading, error, success, saveSection };
}
