import { createContext, useContext } from 'react';

export const MurettoContext = createContext(null); // puoi tipizzare meglio se vuoi

export const useMuretto = () => {
  const context = useContext(MurettoContext);
  if (!context) throw new Error("useMuretto deve essere usato dentro <MurettoProvider />");
  return context.value;
};
