import { useState, FormEvent } from 'react';
import Modal from 'react-modal';

import fecharImg from '../../assets/images/fechar.svg';
import entradasImg from '../../assets/images/entradas.svg';
import saidasImg from '../../assets/images/saidas.svg';

import { api } from '../../services/api';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [type, setType] = useState('Entrada');
  const [category, setCategory] = useState('');

  const handleCreateNewTransaction = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data = {
      title,
      value,
      type,
      category,
    };

    await api.post('/transactions', data);
  };

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

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            onClick={() => {
              setType('deposit');
            }}
            activeColor="green"
          >
            <img src={entradasImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            onClick={() => {
              setType('withdraw');
            }}
            activeColor="red"
          >
            <img src={saidasImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
