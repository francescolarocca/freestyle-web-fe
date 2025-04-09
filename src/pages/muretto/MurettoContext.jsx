import { createContext, useContext } from 'react';

export const MurettoContext = createContext(null); // puoi tipizzare meglio se vuoi

export const useMuretto = () => {
  const context = useContext(MurettoContext);
  console.log("context", context);
  if (!context) throw new Error("useMuretto deve essere usato dentro <MurettoProvider />");
  return context.value;
};
