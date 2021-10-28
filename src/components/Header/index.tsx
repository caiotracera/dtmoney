import logoImg from '../../assets/images/logo.svg';

import { Container, Content } from './styles';

interface IHeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: IHeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
