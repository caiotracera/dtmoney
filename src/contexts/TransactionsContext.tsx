import { createContext, useContext } from 'react';

interface ITransactionsProviderProps {
  children?: React.ReactNode;
}

export const TransactionsContext = createContext([]);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  return (
    <TransactionsContext.Provider value={[]}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
