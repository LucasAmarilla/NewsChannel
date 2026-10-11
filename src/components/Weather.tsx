import {
  WiNightClear,
  WiDaySunny,
  WiDayCloudy,
  WiNightCloudy,
  WiDayCloudyHigh,
  WiNightCloudyHigh,
  WiDayFog,
  WiNightFog,
  WiDaySprinkle,
  WiNightSprinkle,
  WiDayRain,
  WiNightRain,
  WiDaySleet,
  WiNightSleet,
  WiDayThunderstorm,
  WiNightThunderstorm,
  WiAlien,
} from "solid-icons/wi";

interface WeatherProps {
  temperature: number | null;
  wetherCode: number | null;
  windSpeed: number | null;
  humidity: number | null;
  isDay: number | null;
}

export default function Weather(props: WeatherProps) {
  const icon = () => {
    switch (props.wetherCode) {
      case 0:
        return props.isDay === 0 ? (
          <WiNightClear size={100} color="#FFFFFF" />
        ) : (
          <WiDaySunny size={100} color="#FFFFFF" />
        );
      case 1:
        return props.isDay === 0 ? (
          <WiNightClear size={100} color="#FFFFFF" />
        ) : (
          <WiDaySunny size={100} color="#FFFFFF" />
        );
      case 2:
        return props.isDay === 0 ? (
          <WiNightCloudy size={100} color="#FFFFFF" />
        ) : (
          <WiDayCloudy size={100} color="#FFFFFF" />
        );
      case 3:
        return props.isDay === 0 ? (
          <WiNightCloudyHigh size={100} color="#FFFFFF" />
        ) : (
          <WiDayCloudyHigh size={100} color="#FFFFFF" />
        );
      case 45:
      case 48:
        return props.isDay === 0 ? (
          <WiNightFog size={100} color="#FFFFFF" />
        ) : (
          <WiDayFog size={100} color="#FFFFFF" />
        );
      case 51:
      case 53:
      case 55:
        return props.isDay === 0 ? (
          <WiNightSprinkle size={100} color="#FFFFFF" />
        ) : (
          <WiDaySprinkle size={100} color="#FFFFFF" />
        );
      case 61:
      case 63:
      case 65:
        return props.isDay === 0 ? (
          <WiNightRain size={100} color="#FFFFFF" />
        ) : (
          <WiDayRain size={100} color="#FFFFFF" />
        );

      case 80:
      case 81:
      case 82:
        return props.isDay === 0 ? (
          <WiNightSleet size={100} color="#FFFFFF" />
        ) : (
          <WiDaySleet size={100} color="#FFFFFF" />
        );

      case 95:
      case 96:
      case 99:
        return props.isDay === 0 ? (
          <WiNightThunderstorm size={100} color="#FFFFFF" />
        ) : (
          <WiDayThunderstorm size={100} color="#FFFFFF" />
        );

      default:
        return <WiAlien size={100} color="#FFFFFF" />;
    }
  };
  return (
    <>
      <div class="bg-black/80 opacity-90 rounded-4xl h-44 w-80 text-white">
        <div class="flex flex-col ">
          <div class="flex flex-row justify-between items-center mt-3">
            <div class="ml-5">{icon()}</div>
            <div class="text-4xl mr-5 font-bold">{props.temperature + "°C"}</div>
          </div>
          <div class="flex flex-row justify-between ml-2 items-center font-mono text-sm text-center w-full" >
            <p>Humidade: { props.humidity }%</p>
            <p>Velocidade do vento: { props.windSpeed }km/h</p>
          </div>
        </div>
      </div>
    </>
  );
}
