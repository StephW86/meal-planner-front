import axios from 'axios';

const addMeal = async (meal) => {
  try {
    const response = await axios.post('http://127.0.0.1:4000/api/meals/', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: meal
    })
    return response.data;
  } catch (error) {
    throw new Error('Failed to add meal');
  }
};

export default addMeal;