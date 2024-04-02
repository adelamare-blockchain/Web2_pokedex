import { useState, useEffect } from 'react';

export const useFetch = (url, initialState = '', opt) => {
  // STATES
  // State 1 - loading
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState();

  // ComponentDidMount
  useEffect(() => {
    if (loading) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await fetch(url).then((res) => res.json());
        setData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    setLoading(false);
  }, []);

  opt && opt(data);

  return { data, loading, error, setData };
};
