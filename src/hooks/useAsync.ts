import { useState, useCallback } from "react";

export function useAsync<T>(asyncFunction: (...args: any[]) => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await asyncFunction(...args);
      setData(response);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { execute, loading, error, data };
}