export function formatCurrency(valor: number | null, moeda: string): string {
  if (valor === null) return "Carregando...";

  if (moeda == "PYG") {
    return new Intl.NumberFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      maximumFractionDigits: 0,
    }).format(valor);
  } else {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    }).format(valor);
  }


}
