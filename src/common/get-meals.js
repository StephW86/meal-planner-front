import axios from 'axios';

const getMeals = async ({ filters }) => {
  try {
    const response = await axios.get('http://127.0.0.1:4000/api/meals/', {
      params: filters,
      responseType: "json",
    })
    return response.data;
  } catch (error) {
    throw new Error('Failed to get meals');
  }
};

export default getMeals;