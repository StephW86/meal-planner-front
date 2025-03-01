import axios from 'axios';

const deleteMeal = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:4000/api/meals/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response.status;
  } catch (error) {
    throw new Error('Failed to delete meal');
  }
};

export default deleteMeal;