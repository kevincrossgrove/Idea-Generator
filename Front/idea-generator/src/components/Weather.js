import React, {useState} from 'react';
import axios from "axios";

const Weather = () => {
    const [weather, setWeather] = useState("Not yet gotten");

    const getWeather = () => {
        axios.get('/Home').then(response => {
            setWeather(response.data);
        })
    }

    return (
        <div>
            <button onClick={() => getWeather()}>Get weather in Owego</button>
            <h1>The weather in Owego is: {weather}</h1>
        </div>
    )
}

export default Weather;
