import { createContext, useContext } from 'react';

export const NotifyContext = createContext({
  showSuccess: false,
  setShowSuccess: () => {},
  message: '',
  setMessage: () => {},
});

export const useNotify = () => useContext(NotifyContext);