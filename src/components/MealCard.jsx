import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  border: 2px solid;
  border-color: rgba(116, 165, 127);
  margin: 10px;
  border-radius: 20px;
  max-width: 300px;
  min-width: 300px;
`;

const Heading = styled.div`
  font-weight: 600;
  font-size: 18px;
  text-align: center;
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
            {ingredient.amount} {ingredient.amount_type} {ingredient.ingredient}
          </li>
          ))}
      </ul>
    </IngredientsListWrapper>
  )
};

const MealCard = ({ meal }) => {
  const { name, ingredients } = meal;
  return (
    <Card>
      <Heading>{name}</Heading>
      <IngredientsList ingredients={ingredients} />
    </Card>
  )
};

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ingredient: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    amount_type: PropTypes.string.isRequired,
  })).isRequired,
};

MealCard.propTypes = {
  meal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
  }).isRequired,
};

export default MealCard;