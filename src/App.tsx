import { createSignal, onMount, onCleanup } from "solid-js";
import Cambio from "./components/Cambio";
import { getCotation } from "./utils/getCambio";
import Weather from "./components/Weather";
import { getWeather } from "./utils/getWeather";
import NewsCarousel from "./components/News";

export default function App() {
  const [dolarSale, setDolarSale] = createSignal<number | null>(null);
  const [dolarPurchase, setDolarPurchase] = createSignal<number | null>(null);
  const [realSale, setRealSale] = createSignal<number | null>(null);
  const [realPurchase, setRealPurchase] = createSignal<number | null>(null);
  const [dolarRealSale, setDolarRealSale] = createSignal<number | null>(null);
  const [dolarRealPurchase, setDolarRealPurchase] = createSignal<number | null>(
    null,
  );
  const [temperature, setTemperature] = createSignal<number | null>(null);
  const [wetherCode, setWetherCode] = createSignal<number | null>(null);
  const [windSpeed, setWindSpeed] = createSignal<number | null>(null);
  const [humidity, setHumidity] = createSignal<number | null>(null);
  const [isDay, setIsDay] = createSignal<number | null>(null);

  onMount(async () => {
    try {
      const cotacao = await getCotation();
      if (cotacao) {
        const {
          purchaseDolar,
          saleDolar,
          saleReal,
          purchaseReal,
          saleDolarReal,
          purchaseDolarReal,
        } = cotacao;

        setDolarPurchase(purchaseDolar);
        setDolarSale(saleDolar);
        setRealPurchase(purchaseReal);
        setRealSale(saleReal);
        setDolarRealPurchase(purchaseDolarReal);
        setDolarRealSale(saleDolarReal);
      }
    } catch (error) {
      console.error("Erro ao buscar cotação:", error);
    }
  });

  onMount(async () => {
    try {
      const weather = await getWeather();
      if (weather) {
        const { temperature, wetherCode, windSpeed, humidity, isDay } = weather;

        setTemperature(temperature);
        setWetherCode(wetherCode);
        setWindSpeed(windSpeed);
        setHumidity(humidity);
        setIsDay(isDay)

      }
    } catch (error) {
      console.error("Erro ao buscar cotação:", error);
    }
  });

  onMount(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, 60 * 60 * 1000);

    onCleanup(() => clearInterval(timer));
  });

  return (
    <div class="w-screen h-screen">
      <div class="fixed top-2 left-0 z-50 flex px-5 py-4">
        <Weather humidity={humidity()} temperature={temperature()} windSpeed={windSpeed()} isDay={isDay()} wetherCode={wetherCode()}  />
      </div>

      <main class="w-screen h-screen">
        <NewsCarousel/>
      </main>
      <div class="fixed bottom-0 z-50 flex w-full flex-row-reverse items-end gap-3 bg-base-100 text-center px-5 py-4">
        <Cambio
          moeda="🇺🇸 Dolar x 🇧🇷 Real"
          cambioSale={dolarRealSale()}
          cambioPurchase={dolarRealPurchase()}
          finalCurrency="BRL"
        />
        <Cambio
          moeda="🇵🇾 Guarani x 🇺🇸 Dolar"
          cambioSale={dolarSale()}
          cambioPurchase={dolarPurchase()}
          finalCurrency="PYG"
        />

        <Cambio
          moeda="🇵🇾 Guarani x 🇧🇷 Real"
          cambioSale={realSale()}
          cambioPurchase={realPurchase()}
          finalCurrency="PYG"
        />
      </div>
    </div>
  );
}
