import { useEffect, useRef, useState } from 'react';

export function useQuery() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const userFirstInput = useRef(true);

  useEffect(
    function () {
      if (userFirstInput.current) {
        userFirstInput.current = query === '';
        return;
      }

      if (query === '') {
        setError('Please enter a movie title to search!');
        return;
      }

      const queryStart = query.slice(0, 1);
      if (!isNaN(parseFloat(queryStart))) {
        setError('The movie search cannot start with a number');
        return;
      }

      if (query.length < 3) {
        setError('The movie search cannot less than 3 characters');
        return;
      }

      setError(null);
    },
    [query]
  );

  return { query, setQuery, error };
}
