import entradasImg from '../../assets/images/entradas.svg';
import saidasImg from '../../assets/images/saidas.svg';
import dolarImg from '../../assets/images/dolar.svg';

import { Container } from './styles';
import { useTransactions } from '../../contexts/TransactionsContext';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === 'deposit') {
        accumulator.deposits += transaction.amount;
        accumulator.total += transaction.amount;
      } else {
        accumulator.withdrawals += transaction.amount;
        accumulator.total -= transaction.amount;
      }

      return accumulator;
    },
    {
      deposits: 0,
      withdrawals: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={entradasImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={saidasImg} alt="Saidas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdrawals)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={dolarImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
