import styled from "styled-components";

import PropTypes from 'prop-types';

const Option = styled.div`
  padding: 5px;
`

export const Dropdown = ({ list }) => {
  const options = (dropDownList) => {
    return dropDownList.map((option) => {
      const value = option.value;
      return (
        <Option key={value.toLowerCase()} value={value.toLowerCase()}>
          {option.label}
        </Option>
      )
    });
  };

  return (
    <>
      {options(list)}
    </>
  );
};

Dropdown.propTypes = {
  list: PropTypes.array,
};