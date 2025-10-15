"use client";

import { useEffect, useRef } from "react";

export const usePolling = (callback: () => Promise<void>, interval: number, deps: React.DependencyList) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = async () => {
      await savedCallback.current();
    };

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, ...deps]);
};
