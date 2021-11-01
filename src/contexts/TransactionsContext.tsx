import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

type TransactionInput = Pick<
  ITransaction,
  'title' | 'amount' | 'type' | 'category'
>;
interface ITransactionsContext {
  transactions: ITransaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}
interface ITransactionsProviderProps {
  children?: React.ReactNode;
}

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  formatted_amount: string;
  type: string;
  category: string;
  createdAt: string;
  formatted_date: string;
}

const TransactionsContext = createContext<ITransactionsContext>(
  {} as ITransactionsContext
);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const createTransaction = useCallback(
    async (transaction: TransactionInput) => {
      const {
        data: { transaction: newTransaction },
      } = await api.post('/transactions', {
        ...transaction,
        createdAt: new Date(),
      });

      setTransactions([
        ...transactions,
        {
          ...newTransaction,
          formatted_amount: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(newTransaction.amount),
          formatted_date: new Intl.DateTimeFormat('pt-BR').format(
            new Date(newTransaction.createdAt)
          ),
        },
      ]);
    },
    [transactions]
  );

  useEffect(() => {
    api.get('/transactions').then(({ data }) => {
      const formattedTransactions = data.transactions.map(
        (eachTransaction: ITransaction) => {
          return {
            ...eachTransaction,
            formatted_amount: new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(eachTransaction.amount),
            formatted_date: new Intl.DateTimeFormat('pt-BR').format(
              new Date(eachTransaction.createdAt)
            ),
          };
        }
      );

      setTransactions(formattedTransactions);
    });
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
