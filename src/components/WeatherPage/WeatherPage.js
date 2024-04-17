import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchWeather } from '../../services/api';
import "./style.css";

function WeatherPage() {
    const { cityName } = useParams();
    const [weatherInfo, setWeatherInfo] = useState(null);

    // @description The useEffect hook is used for fetching current city weather information.
    
    useEffect(() => {
        const getWeatherInfo = async () => {
            try {
                const weatherData = await fetchWeather(cityName);
                setWeatherInfo(weatherData)
            } catch (error) {
                console.error(error);
            }
        };

        getWeatherInfo();
    }, [cityName]);

    // @ description the getTime function used for calculation Sunrise and Sunset timing 

    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
            timeStamp * 1000
        ).getMinutes()}`;
    };

    const sideRight = () => {
        var slider = document.getElementById('scrolledItem');
        slider.scrollLeft = slider.scrollLeft + 300;
    }

    const sideLeft = () => {
        var slider = document.getElementById('scrolledItem');
        slider.scrollLeft = slider.scrollLeft - 300;
    }


    return (
        <div className='container'>
            <div className='box'>
                <div className='weatherData'>
                    <h1>City: {cityName}</h1>
                    <div className='currtemp'>
                        <div className='tempAndLogo'>

                            {/* logo of current weather */}

                            <div>
                                <img src={`../assets/${weatherInfo?.weather[0]?.icon}.svg`} width={200} alt='icon' />
                            </div>

                            {/* current Wind Speed */}

                            <div>
                                {Math.round(weatherInfo?.main?.temp)}&deg;C
                                <p>{weatherInfo?.wind?.speed}</p>
                            </div>
                        </div>

                        {/* @description The below code is to showing Wind Speed, Minimum temperatue and Maximum temperature */}
                        
                        <div className='windData'>
                            <p>Wind:<span className='ml-2'>{weatherInfo?.wind?.speed}&nbsp;mph</span></p>
                            <p>Min Temp:<span className='ml-2'>{Math.round(weatherInfo?.main?.temp_min)}&deg;C</span></p>
                            <p>Max Temp:<span className='ml-2'>{Math.round(weatherInfo?.main?.temp_max)}&deg;C</span></p>
                        </div>
                    </div>

                    {/* @description the below code is of showing current status of weather like Sunrise,
                    Humidity, Wind speed, Pressure and Sunset. */}

                    <div id='scrolledItem' className='forcastdata'>
                        <div>
                            <p>SUNRISE:</p>
                            <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunrise.svg'} width={100} alt='icon' />
                            <p>{getTime(weatherInfo?.sys?.sunrise)}</p>
                        </div>
                        <div>
                            <p>HUMIDITY:</p>
                            <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg'} width={100} alt='icon' />
                            <p>{weatherInfo?.main?.humidity}&nbsp;mm</p>
                        </div>
                        <div>
                            <p>WIND:</p>
                            <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg'} width={100} alt='icon' />
                            <p>{weatherInfo?.wind?.speed}&nbsp;mph</p>
                        </div>
                        <div>
                            <p>PRESURE:</p>
                            <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/pressure-low.svg'} width={100} alt='icon' />
                            <p>{weatherInfo?.main?.pressure}&nbsp;mb</p>
                        </div>

                        <div>
                            <p>SUNSET:</p>
                            <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunset.svg'} width={100} alt='icon' />
                            <p>{getTime(weatherInfo?.sys?.sunset)}</p>
                        </div>
                    </div>

                    {/* @description the rigtharrow and leftarrow is of scrolling Sunrise,
                     Humidity, Wind, Pressure and Sunset is of small screen */}
                    
                    <p onClick={sideRight} className='rigtharrow'>&gt;</p>
                    <p onClick={sideLeft} className='leftarrow'>&lt;</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherPage;