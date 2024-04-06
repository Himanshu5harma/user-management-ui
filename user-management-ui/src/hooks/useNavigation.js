import { useState, useCallback } from "react";

const useNavigation = () => {
  const [currentRoute, setCurrentRoute] = useState("Home");

  const selectAction = useCallback((option) => {
    if (currentRoute === option) return;
    setCurrentRoute(option);
  }, [currentRoute]);

  return { currentRoute, setCurrentRoute: selectAction };
};

export default useNavigation;
