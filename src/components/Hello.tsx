import { useEffect, useState } from 'react';
import { IGPTResponse } from '../interfaces/IGPTResponse';
import { httpsGet, httpsPost } from '../services/axiosService';
import { handleGptResponse } from '../services/gptService';
import { formatWeatherData } from '../services/weatherService';
import { isTruthy } from '../util/isTruthy';

// If you're using actual API keys, you should create a small express server to handle the API calls.
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/**
 * A simple example component.
 */
export const Hello = () => {
    // const [weather, setWeather] = useState<IWeatherData | null>(null);
    const [gptOpinion, setGptOpinion] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const success = async (pos: any) => {
        console.log("Success in action! :D");
        const coords = pos.coords;

        await httpsGet(`api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${coords.latitude},${coords.longitude}&days=1&aqi=no&alerts=no`)
            .then(async (data) => {
                let formattedData = await formatWeatherData(data);
                
                let morningData = formattedData.forecast[7];
                let afternoonData = formattedData.forecast[13];
                let eveningData = formattedData.forecast[19];
                formattedData.forecast = [morningData, afternoonData, eveningData];

                const prompt = 
                "Based on the following data:\n" + 
                JSON.stringify(formattedData) + 
                "\nWould today be a good day to ride the motorcycle?" + 
                "\nIt is a bad day if: rain, snow." +
                "\nWrite a response like a morning greeting of about 5 sentences with a short and easily understandable summary of the day's weather.";

                console.log("Prompt:", prompt);

                const gptResponse = await handleGptResponse(prompt)
                    .catch((err) => {
                        console.log("Error in getting GPT response:", err);
                        setError("Error in getting GPT response.");
                    }) as IGPTResponse;
                
                if (!isTruthy(error)) setGptOpinion(gptResponse.data.choices[0].text);
            })
            .catch((err) => {
                console.log('Error in getting weather data:', err);
                setError('Error in getting weather data.');
            });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);
    
    if (isTruthy(error)) return (
        <div>
            {error}
        </div>
    );
    return (
        <div>
            Hello! /wave

            { 
                isTruthy(gptOpinion) && (
                    <div>
                        <h1>Is today a good day to ride?</h1>
                        <p>{gptOpinion}</p>
                    </div>
                )
            }
        </div>
    );
};