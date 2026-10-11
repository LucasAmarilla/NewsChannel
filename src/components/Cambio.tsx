import { formatCurrency } from "../utils/format";

interface CambioProps {
  moeda: string;
  cambioPurchase: number | null;
  cambioSale: number | null;
  finalCurrency: string;
}

export default function Cambio(props: CambioProps) {
  return (
    <>
      <div class="w-60 h-36 bg-black/70 rounded-4xl opacity-90 text-white">
        <h3 class="font-bold pt-5 text-xl">{props.moeda}</h3>
        <div class="font-semibold pt-4">
          <p>Compra: {formatCurrency(props.cambioPurchase, props.finalCurrency)}</p>
          <p>Venta: {formatCurrency(props.cambioSale, props.finalCurrency)}</p>
        </div>
      </div>
    </>
  );
}
