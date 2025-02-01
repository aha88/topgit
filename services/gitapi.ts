import axios from 'axios';

export const fetchRepositories = async (page: number) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=created:%3e2024-07-15&sort=stars&order=desc&page=${page}`
    );
    
    return response.data.items; 

  } catch (error) {

    console.error('Error fetching data:', error);
    throw error;    
}
};
