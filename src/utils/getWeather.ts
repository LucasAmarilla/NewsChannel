interface Weather {
  temperature: number | null;
  wetherCode: number | null;
  windSpeed: number | null;
  humidity: number | null;
  isDay: number | null;
}

export async function getWeather() {
  const response = await fetch("/api/weather");

  const data = await response.json();

  const weather: Weather = {
    temperature: data.current.apparent_temperature ?? null,
    wetherCode: data.current.weather_code ?? null,
    windSpeed: data.current.wind_speed_10m ?? null,
    humidity: data.current.relative_humidity_2m ?? null,
    isDay: data.current.is_day ?? null,
  };

  return weather;


}
