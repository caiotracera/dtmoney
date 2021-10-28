import { useEffect, useState } from 'react';

import { api } from '../../services/api';
import { Container } from './styles';

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then(({ data }) => setTransactions(data));
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
              <tr>
                <td>{transaction.title}</td>
                <td className={transaction.type}>R$ {transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
