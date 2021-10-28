import entradasImg from '../../assets/images/entradas.svg';
import saidasImg from '../../assets/images/saidas.svg';
import dolarImg from '../../assets/images/dolar.svg';

import { Container } from './styles';

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={entradasImg} alt="Entradas" />
        </header>
        <strong>R$1000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={saidasImg} alt="Saidas" />
        </header>
        <strong>R$200,00</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={dolarImg} alt="Total" />
        </header>
        <strong>R$800,00</strong>
      </div>
    </Container>
  );
}
