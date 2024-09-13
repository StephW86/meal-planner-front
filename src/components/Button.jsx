import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  background: ${({ disabled }) => (disabled ? "transparent" : "#ff9999")};
  border: ${({ disabled }) => (disabled ? "2px solid #ffe6e6" : "2px solid #ff9999")};
  color: ${({ disabled }) => (disabled ? "#c5e4eb" : "#064552")};
  padding: 10px;
  margin: 10px;
  outline: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1em;
  cursor: pointer;
  width: fit-content;

  &:hover,
  &:focus {
    opacity: ${({ disabled }) => (disabled ? 'auto' : '0.8')};
    transform: ${({ disabled }) => (disabled ? 'none': 'translateY(-1px)')};
    cursor: ${({ disabled }) => (disabled ? '': 'pointer')};
    outline: none;
  }
`;

const Button = ({type, onClick, disabled, children}) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  )
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Button;