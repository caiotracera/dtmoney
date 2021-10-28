import Modal from 'react-modal';

import fecharImg from '../../assets/images/fechar.svg';
import entradasImg from '../../assets/images/entradas.svg';
import saidasImg from '../../assets/images/saidas.svg';

import { Container, TransactionTypeContainer } from './styles';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={fecharImg} alt="Fechar modal" />
      </button>

      <Container>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder="Título" />
        <input type="number" placeholder="Valor" />

        <TransactionTypeContainer>
          <button type="button">
            <img src={entradasImg} alt="Entrada" />
            <span>Entrada</span>
          </button>

          <button type="button">
            <img src={saidasImg} alt="Saída" />
            <span>Saída</span>
          </button>
        </TransactionTypeContainer>

        <input type="text" placeholder="Categoria" />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
