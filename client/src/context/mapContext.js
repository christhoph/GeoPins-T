import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo
} from "react";

const MapContext = createContext();

const useMap = () => {
  const context = useContext(MapContext);

  return context ? context : null;
};

const MapContextProvider = ({ children }) => {
  const [draft, setDraft] = useState(null);

  const createDraft = useCallback(
    () => setDraft({ latitude: 0, longitude: 0 }),
    []
  );
  const updateDraft = useCallback(coords => setDraft(coords), []);
  const deleteDraft = useCallback(() => setDraft(null), []);

  const value = useMemo(
    () => ({ draft, createDraft, updateDraft, deleteDraft }),
    [draft]
  );

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export { useMap, MapContextProvider };
