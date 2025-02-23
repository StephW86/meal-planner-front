import { useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/Button";
import { MultiSelect } from "react-multi-select-component";
import addMeal from "../common/add-meal";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  max-width: 800px;
  border: 2px solid rgba(116, 165, 127);
  border-radius: 10px;
  padding: 20px;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;

  @media: (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    margin-right: 0;
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  margin-left: 10px;
  border: 2px solid rgba(116, 165, 127, 0.5);
  border-radius: 8px;
  width: auto;

  @media (max-width: 600px) {
  margin-left: 0px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IngredientButton = styled(Button)`
  border-color: #077187;
  background-color: transparent;
  width: 100px;
  justify-content: flex-end;
`;

const StyledSubmitButton = styled(Button)`
  @media (max-width: 600px) {
    margin-left: 0px;
  }
  justify-content: flex-end;
`;

const StyledControllerWrapper = styled.div`
  padding: 8px;
`;

const CreateMeal = () => {
  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      mealName: '',
      selectedTags: [],
    }
  });

  const [mealName, setMealName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const selectedTags = watch('selectedTags');

  const handleChange = (event, setValueFunction) => {
    setValueFunction(event.target.value);
  }

  const handleAddIngredient = () => {
    const newIngredient = {
      ingredient,
      amount
    }
    setIngredients([...ingredients, newIngredient])
    setIngredient('')
    setAmount('')
  }

  const mealTags = [
    { value: 'main' , label: "Main" },
    { value: 'dessert' , label: "Dessert" },
    { value: 'starter' , label: "Starter" },
    { value: 'side' , label: "Side" },
    { value: 'snack' , label: "Snack" },
    { value: 'breakfast' , label: "Breakfast" },
    { value: 'dinner' , label: "Dinner" },
    { value: 'sauce' , label: "Sauce" },
    { value: 'soup' , label: "Soup" },
    { value: 'indian' , label: "Indian" },
    { value: 'italian' , label: "Italian" },
    { value: 'japanese' , label: "Japanese" },
    { value: 'asian' , label: "Asian" },
    { value: 'middleEastern' , label: "Middle Eastern" },
    { value: 'mexican' , label: "Mexican" },
    { value: 'spanish' , label: "Spanish" },
    { value: 'thai' , label: "Thai" },
    { value: 'portuguese' , label: "Portuguese" },
    { value: 'mauritian' , label: "Mauritian" },
    { value: 'moroccan' , label: "Moroccan" },
  ]

  const sortedMeals = mealTags.sort((a, b) => {
    if (a.value < b.value) return -1
    if (a.value > b.value) return 1
    return 0
  })

  const onSubmit = async (meal) => {
    try {
      const tags = meal.selectedTags.map((tag) => tag.value)

      const mealDetails = {
        name: mealName,
        ingredients,
        tags
      };

      console.log('SUBMIT', mealDetails);
      await addMeal(mealDetails);

      reset();
      setMealName('');
      setAmount('');
      setIngredient('');
      setIngredients([]);
    } catch (error) {
      console.error("Couldn't add meal", error);
    }
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(item => item.ingredient !== ingredient.ingredient ))
  }

  const disableAddIngredientButton = () => {
    return !ingredient || !amount
  }

  const disableSubmitMealButton = () => {
    return !ingredients.length || !mealName || !selectedTags.length
  }

  const showIngredients = (ingredients) => {
    console.log('SELECTED TAGS', selectedTags)

    return ingredients.map((ingredient) => (
      <div key={ingredient.ingredient}>
        {ingredient.amount} {ingredient.ingredient}
        <Button type='button' onClick={() => removeIngredient(ingredient)}>
          X
        </Button>
      </div>
    ))
  }

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label>
            Name of meal:
            <StyledInput
              id="mealName"
              value={mealName}
              {...register("mealName")}
              onChange={(event) => handleChange(event, setMealName)}
            />
          </Label>
        </FormField>
        <FormField>
          <Label>
            Amount:
            <StyledInput
              id="amount"
              value={amount}
              {...register("amount")}
              onChange={(event) => handleChange(event, setAmount)}
            />
          </Label>
        </FormField>
        <FormField>
          <Label>
            Ingredient:
            <StyledInput
              id="ingredient"
              value={ingredient}
              {...register("ingredient")}
              onChange={(event) => handleChange(event, setIngredient)}
            />
          </Label>
        </FormField>
        <ButtonWrapper>
          <IngredientButton
            type="button"
            disabled={disableAddIngredientButton()}
            onClick={() => handleAddIngredient()}>
            Add ingredient
          </IngredientButton>
        </ButtonWrapper>
        {ingredients.length > 0 && (
          showIngredients(ingredients)
        )}
        <StyledControllerWrapper>
          <Controller
            control={control}
            name="selectedTags"
            render={({ field }) => (
              <MultiSelect
                options={sortedMeals}
                value={field.value || []}
                onChange={(value) => {
                  field.onChange(value)
                }}
                labelledBy="Tags"
              />
            )}
          />
        </StyledControllerWrapper>
        <ButtonWrapper>
          <StyledSubmitButton
            disabled={disableSubmitMealButton()}
            type="submit">
            Submit meal
          </StyledSubmitButton>
        </ButtonWrapper>
      </StyledForm>
    </StyledContainer>
  );
};

export default CreateMeal;