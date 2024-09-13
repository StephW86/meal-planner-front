import { useEffect, useState } from "react";
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
  padding: 10px;
  align-items: center;
`;

const Label = styled.label`
  display: flex;

  @media: (max-width: 600px) {
    flex-direction: column;
  }
`;

const IngredientButton = styled(Button)`
  border-color: #077187;
  background-color: transparent;
  width: 100px;
`;

const StyledInput = styled.input`
  padding: 5px;
  margin-left: 10px;
  border: 2px solid rgba(116, 165, 127, 0.5);
  border-radius: 8px;
  width: auto;

  @media (max-width: 600px) {
    margin-left: 0px;
  }
`;

const StyledSubmitButton = styled(Button)`
  margin: 0px;
  justify-content: flex-end;

  @media (max-width: 600px) {
    margin-left: 0px;
  }
`;

const CreateMeal = () => {
  const { register, handleSubmit, control } = useForm();
  const [mealName, setMealName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log('ingredients', ingredients)
  }, [ingredients])

  const handleChange = (event, setValueFunction) => {
    setValueFunction(event.target.value);
  }

  const handleAddIngredient = () => {
    const newIngredient = {
      'ingredient': ingredient,
      'amount': amount,
      'amount_type': amountType
    }
    setIngredients(ingredients => [...ingredients, newIngredient])
    setIngredient('')
    setAmount('')
    setAmountType('')
  }

  const mealTags = [
    { value: 'main' , label: "Main" },
    { value: 'dessert' , label: "Dessert" },
    { value: 'starter' , label: "Starter" },
    { value: 'side' , label: "Side" },
    { value: 'snack' , label: "Snack" },
    { value: 'breakfast' , label: "Breakfast" },
    { value: 'sauce' , label: "Sauce" },
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
      const tags = meal.mealTags.map((tag) => tag.value)

      const mealDetails = {
        name: meal.mealName,
        ingredients: ingredients,
        tags: tags
      };

      console.log('SUBMIT', mealDetails);
      await addMeal(mealDetails);
    } catch (error) {
      console.error("Couldn't add meal", error);
    }
  }

  const removeIngredient = (ingredient) => {
    const ingredientToDelete = ingredient.ingredient
    const updatedIngredients = ingredients.filter(
      (item) => item.ingredient !== ingredientToDelete
    );

    setIngredients(updatedIngredients)
  }

  const showAddIngredientButton = () => {
    if (amountType === '' || ingredient === '' || amount === '') return true

    return false
  }

  const showIngredients = (ingredients) => {
    return ingredients.map((ingredient) => (
      <div key={ingredient.ingredient}>
        {ingredient.amount} {ingredient.amount_type} {ingredient.ingredient}
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
            Ingredient:
            <StyledInput
              id="ingredient"
              value={ingredient}
              {...register("ingredient")}
              onChange={(event) => handleChange(event, setIngredient)}
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
            Amount type:
            <StyledInput
              id="amountType"
              value={amountType}
              {...register("amountType")}
              onChange={(event) => handleChange(event, setAmountType)}
            />
          </Label>
        </FormField>
        <IngredientButton
          type="button"
          disabled={showAddIngredientButton()}
          onClick={() => handleAddIngredient()}>
          Add ingredient
        </IngredientButton>
        {ingredients.length > 0 && (
          showIngredients(ingredients)
        )}
        <div>
          <Controller
            control={control}
            name="mealTags"
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
        </div>
        <StyledSubmitButton type="submit">
          Submit meal
        </StyledSubmitButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default CreateMeal;