import Button from "./Button";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useState } from "react";

const StyledNavBar = styled.div`
  display: flex;
  justify-content: center;
  background-color: #077187;
  margin-bottom: 10px;
  width: 100%;
`;

const NavBar = () => {
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // const disableButton = () => {
  //   setIsButtonDisabled(!isButtonDisabled)
  // }

  return (
    <StyledNavBar>
      <Link to="/">
        <Button
          // disabled={isButtonDisabled}
          // onClick={disableButton}
          >
          Meals
        </Button>
      </Link>
      <Link to="/create-meal">
        <Button
          // disabled={isButtonDisabled}
          // onClick={disableButton}
          >
          Add meal
        </Button>
      </Link>
      <Link to="/update-meal">
        <Button
          // disabled={isButtonDisabled}
          // onClick={disableButton}
          >
          Update meal
        </Button>
      </Link>
    </StyledNavBar>
  )
};

export default NavBar;