import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/Button";
import { useState } from "react";
import PropTypes from 'prop-types';

const FilterForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px;
  border: 2px solid;
  border-color: rgba(116, 165, 127, 0.5);
  margin: 10px;
  border-radius: 10px;
  width: 500px;
`;

const FormField = styled.div`
  padding: 5px;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 150px;
`;

const Label = styled.label`
  margin-right: 20px;
  padding: 5px;
`;

const StyledSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  font-size: 14px;
`;

const StyledSubmitButton = styled(Button)`
  margin: 0px;
`;

const RandomiseMeals = ({ setFilters }) => {
  const { register, handleSubmit } = useForm();
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedMealType, setSelectedMealType] = useState('Main');

  const onSubmit = data => {
    console.log('DATA', data);
    setFilters(data)
  }

  const handleSelectChange = (event, setValueFunction) =>{
    setValueFunction(event.target.value);
  };

  const numberOptions = () =>{
    const noOfMeals = [1, 2, 3, 4, 5, 6, 7]
    return (
      noOfMeals.map(number => <option key={number} value={number}>{number}</option>)
    )
  }

  const mealTypeOptions = () => {
    const mealTypes = ["Main", "Dessert", "Starter", "Side", "Snack", "Breakfast", "Sauce"]
    return (
      mealTypes.map(mealType => <option key={mealType.toLowerCase()} value={mealType.toLowerCase()}>{mealType}</option>)
    )
  }

  return (
      <FilterForm onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label>
            Number of meals:
            <StyledSelect
              id="noOfMeals"
              {...register("noOfMeals")}
              value={selectedNumber}
              onChange={(event) => {handleSelectChange(event, setSelectedNumber)}}
            >
              {numberOptions()}
            </StyledSelect>
          </Label>
        </FormField>
        <FormField>
          <Label>
            Type of meal:
            <StyledSelect
              id="mealType"
              {...register("mealType")}
              value={selectedMealType}
              onChange={(event) => {handleSelectChange(event, setSelectedMealType)}}
              >
              {mealTypeOptions()}
            </StyledSelect>
          </Label>
        </FormField>
        <StyledSubmitButton type="submit">
          Randomise!
        </StyledSubmitButton>
      </FilterForm>
  )
};

RandomiseMeals.propTypes = {
  setFilters: PropTypes.func.isRequired,
};


export default RandomiseMeals;