import { useEffect, useState } from "react";

export default function useLocalStorage(...keys: string[]) {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(new Map<string, any>());

  useEffect(() => {
    const mp = new Map<string, any>();
    for (let key of keys) {
      const json_data = localStorage.getItem(key);
      if (json_data) mp.set(key, JSON.parse(json_data));
    }

    setValues(mp);
    setLoading(false);
  }, []);

  return {
    loading,
    values,
  };
}
