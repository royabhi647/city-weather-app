## City Weather Forecast Web Application

This web application is built using React and JavaScript. It displays information about cities in a table format and allows users to view weather forecasts for selected cities.

### [live preview](https://main--abhii-weather.netlify.app/)

## Features

### Display Cities in a Table
   - Shows all cities in a table format with infinite scroll.
   - Utilizes the GeoNames API to fetch city data.
   - The table includes columns for city name, country, timezone, etc.
   - Implements search-as-you-type functionality with autocomplete suggestions for possible locations.
   - Provides filter and sorting options for each column.

### Weather Page
   - Clicking on a city name in the table section navigates to the weather page for that city.
   - Uses the OpenWeatherMap API to display weather information.
   - Displays current weather details such as temperature, weather description, humidity, wind speed, and atmospheric   pressure.
   - Shows forecast information including temperature highs and lows, weather descriptions, and precipitation chances.

### Technologies Used
   - React.js
   - JavaScript
   - Axios (for API requests)
   - Tailwind
   - React Router (for navigation)
   - Intersection Observer

### Credits
   - GeoNames API: https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000
   - OpenWeatherMap API: https://openweathermap.org

### Setup Instructions
1. Clone the repository to your local machine:
   <pre>git clone https://github.com/your-username/city-weather-app.git</pre>

2. Navigate to the project directory:
   <pre>cd city-weather-app</pre>

3. Install dependencies:
   <pre>npm install</pre>

4. Start the development server:
   <pre>npm start</pre>

5. Open your web browser and visit http://localhost:3000 to view the application.