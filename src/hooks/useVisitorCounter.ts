import { useEffect, useState } from 'react';
import { incrementVisitorCount } from '../firebase/visitorService';

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCount = async () => {
      try {
        const count = await incrementVisitorCount();
        if (isMounted) {
          setVisitorCount(count);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setVisitorCount(142);
          setLoading(false);
        }
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return { visitorCount, loading };
};
