import axios from 'axios';

const BASE_URL = 'https://dragonball-api.com/api';

export const getCharacters = async (limit = 50) => {
  try {
    const response = await axios.get(`${BASE_URL}/characters?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};

export const getCharacterById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    throw error;
  }
};

export const getPlanets = async (limit = 50) => {
  try {
    const response = await axios.get(`${BASE_URL}/planets?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar planetas:', error);
    throw error;
  }
};
