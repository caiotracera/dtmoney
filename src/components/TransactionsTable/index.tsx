import { useEffect, useState } from 'react';

import { api } from '../../services/api';
import { Container } from './styles';

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

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

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
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions &&
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {transaction.formatted_amount}
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.formatted_date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
