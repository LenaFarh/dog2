import { useEffect, useState } from "react";

export function getAnswer(numb) {
  const n = numb % 100;
  const n1 = numb % 10;
  if (n > 10 && n < 20) return 'товаров';
  if (n1 === 1) return 'товар';
  if (n1 > 1 && n1 < 5) return 'товара';
  if (n1 > 4 || !n1) return 'товаров';
}

export const useDebounce = (statSarch, delay = 500) => {
  const [DebounceValue, setDebounceValue] = useState(statSarch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(statSarch);
    }, delay);
    return () => clearTimeout(timeout)
  }, [statSarch]);
  return DebounceValue;
}

export const findLike = (product, currentUser)=> 
   product?.likes?.some((el) => el === currentUser._id);