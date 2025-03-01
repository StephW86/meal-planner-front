import styled from "styled-components";
import MealCard from "../components/MealCard";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import RandomiseMeals from "./RandomiseMeals";
import Button from "../components/Button";
import getMeals from "../common/get-meals";
import deleteMeal from "../common/delete-meal";
// import { useInfiniteQuery, useQueryClient } from "react-query";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FilterFormButton = styled(Button)`
  border-color: #077187;
  background-color: transparent;
  width: 100px;
`;

const FilterFormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Meals = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly
`;

const ErrorNote = styled.p`
  display: flex;
  justify-content: center;
`

const ShowMeals = () => {
  const [meals, setMeals] = useState([]);
  const [filters, setFilters] = useState({});
  const [randomiseMeals, setRandomiseMeals] = useState(false);
  const [error, setError] = useState('');

  // const queryClient = useQueryClient();
  // const { data, fetchNextPage, isError } = useInfiniteQuery;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setError('');
        const filteredMeals = await getMeals({ filters })
        console.log('FILTERED MEALS', filteredMeals);
        setMeals(filteredMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setError("No meals found");
      }
    }
    fetchMeals();
  }, [filters])

  // const getMeals = async ({ filters, pageParam = 1, searchParam = '' }) => {

  const handleDeleteMeal = (id) => {
    deleteMeal(id)
    setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id))
  }

  const mealsList = (meals) =>
    meals.map((meal) => (
      <MealCard
        key={meal._id}
        meal={meal}
        deleteMeal={() => handleDeleteMeal(meal._id)}
      />
    ));

  return (
    <>
      <StyledContainer>
        <FilterFormButton onClick={() => {setRandomiseMeals(!randomiseMeals)}}>
          Randomiser
        </FilterFormButton>
      </StyledContainer>
      <FilterFormWrapper>
        {randomiseMeals && (
          <RandomiseMeals
          filters={filters}
          setFilters={setFilters}
          />
        )}
      </FilterFormWrapper>
      {error ? (
        <ErrorNote>{error}</ErrorNote>
      ) : (
        <Meals>
          {meals.length > 0 ? mealsList(meals) : <p>Loading...</p>}
        </Meals>
      )}
    </>
  )
};

ShowMeals.propTypes = {
  meals: PropTypes.array,
};

export default ShowMeals;