import { IWeatherData } from "../interfaces/IWeatherData";
import { isTruthy } from "../util/isTruthy";

export const formatWeatherData = async (data: any): Promise<IWeatherData> => {
    if (!isTruthy(data)) return Promise.reject("formatWeatherData (service): Data is falsy.");

    const weatherData: IWeatherData = {
        astro: {
            sunrise: data.forecast.forecastday[0].astro.sunrise,
            sunset: data.forecast.forecastday[0].astro.sunset,
        },
        forecast: data.forecast.forecastday[0].hour.map((hour: any) => {
            return {
                time: hour.time,
                temp: hour.temp_c,
                condition: {
                    text: hour.condition.text,
                },
                wind_kph: hour.wind_kph,
                wind_degree: hour.wind_degree,
                wind_dir: hour.wind_dir,
                humidity: hour.humidity,
                cloud: hour.cloud,
                feelslike_c: hour.feelslike_c,
                windchill_c: hour.windchill_c,
                heatindex_c: hour.heatindex_c,
                dewpoint_c: hour.dewpoint_c,
                will_it_rain: hour.will_it_rain,
                chance_of_rain: hour.chance_of_rain,
                will_it_snow: hour.will_it_snow,
                chance_of_snow: hour.chance_of_snow,
                vis_km: hour.vis_km,
                gust_kph: hour.gust_kph,
                uv: hour.uv,
            };
        }),
    };

    return weatherData;
}