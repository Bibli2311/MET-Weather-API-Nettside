import axios from 'axios'

async function getData()
{
    axios.get('https://api.met.no/weatherapi/metalerts/1.1?show=all')
    .then(response => {
  
      return response
      
      });
}

export default getData;

