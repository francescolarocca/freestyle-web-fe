import { createContext, useContext } from 'react';
import { findAllMuretti } from '../../services/muretto';

export const MurettoContext = createContext({
  muretto : null,
  findMurettoByAlias: () => {},
}); // puoi tipizzare meglio se vuoi

export const useMuretto = () => {
  const context = useContext(MurettoContext);
  if (!context) throw new Error("useMuretto deve essere usato dentro <MurettoProvider />");
  return context.value;
};
