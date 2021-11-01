import { useState, FormEvent, useCallback } from 'react';
import Modal from 'react-modal';

import fecharImg from '../../assets/images/fechar.svg';
import entradasImg from '../../assets/images/entradas.svg';
import saidasImg from '../../assets/images/saidas.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../contexts/TransactionsContext';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');

  const handleCreateNewTransaction = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await createTransaction({ title, amount, type, category });

      setTitle('');
      setAmount(0);
      setType('deposit');
      setCategory('');
      onRequestClose();
    },
    [amount, category, createTransaction, onRequestClose, title, type]
  );

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
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
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
