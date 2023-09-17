import React from 'react';

interface IMapContext {
  layer: string;
  setLayer: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MapContext = React.createContext<IMapContext>({
  layer: '',
  setLayer: () => undefined,
});
