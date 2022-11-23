import { useContext, createContext } from 'react';
import stores, { AppState } from '../stores';

export const StoreContext = createContext(stores);
export const { Provider } = StoreContext;
export const useStore = (): AppState => useContext(StoreContext);
