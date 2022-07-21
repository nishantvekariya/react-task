import axios from 'axios';  

export const getDefinitions = (word) => axios({
  method: 'GET',
  url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
});