// Librairies
import { useState } from 'react';

// MAIN FUNCTION
export const useCounter = (initialState = 0) => {
  const [count, setCount] = useState(initialState);

  const add = () => setCount(count + 1);

  const substract = () => setCount(count - 1);

  return { count, add, substract };
};
