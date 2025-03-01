import styled from "styled-components";
import Button from "../components/Button";
import PropTypes from 'prop-types';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid;
  border-color: rgba(116, 165, 127);
  margin: 10px;
  border-radius: 20px;
  max-width: 300px;
  min-width: 300px;
`;

const CardHeader =  styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`

const Heading = styled.div`
  font-weight: 600;
  font-size: 18px;
  width: 100%;
`;

const IngredientsListWrapper = styled.div`
  align-items: flex-start;
`;

const IngredientsList = ({ ingredients }) => {
  return (
    <IngredientsListWrapper>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.amount} {ingredient.ingredient}
          </li>
          ))}
      </ul>
    </IngredientsListWrapper>
  )
};

const MealCard = ({ meal, deleteMeal }) => {
  const { name, ingredients } = meal;

  return (
    <Card>
      <CardHeader>
        <Heading>{name}</Heading>
        <Button type="button" onClick={() => deleteMeal()}>X</Button>
        {/* <Button type="button" onClick={() => console.log('DELETE')}>X</Button> */}
      </CardHeader>
      <IngredientsList ingredients={ingredients} />
    </Card>
  )
};

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ingredient: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
};

MealCard.propTypes = {
  meal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ingredient: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  deleteMeal: PropTypes.func.isRequired,
};

export default MealCard;