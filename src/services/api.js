import axios from 'axios';

/*  @description fetchCities function is for fetching all Cities with a population > 1000 from Geonames api
    params{offset} is for infinite scrolling.
*/

const fetchCities = async (offset) => {
    try {
        const response = await axios.get(`https://documentation-resources.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cities: ${error}`);
    }
};

/* @description fetchWeather function is for fetching weather details of city
    params{cityName} is for fetching current city weather.
*/

const fetchWeather = async (cityName) => {
    const API_KEY = "5b16b66df7fa4d7f3d184649ead148ee";
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

export { fetchCities, fetchWeather };