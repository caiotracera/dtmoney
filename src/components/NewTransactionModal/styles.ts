import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;

    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }

    background: #e7e9ee;
  }

  button[type='submit'] {
    width: 100%;
    height: 4rem;

    padding: 0 1.5rem;
    margin-top: 1.5rem;

    background: var(--green);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;

    border-radius: 0.25rem;
    border: 0;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(90%);
    }
  }
`;
