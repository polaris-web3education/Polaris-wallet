import styled from "styled-components";

const StyledButton = styled.button`
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border: none;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 6px;
  font-family: 'Roboto', Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: 
    background 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5a9fef, #4289d9);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    background: linear-gradient(135deg, #3d7cc5, #2f6cb3);
  }

  &.inactive {
    background: #a0a0a0;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background: #a0a0a0;
      transform: none;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }

  svg {
    margin-right: 8px;
  }
`;

export default StyledButton;