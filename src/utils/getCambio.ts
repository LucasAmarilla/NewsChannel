interface Exchange {
  isoCode: string;
  purchasePrice: number;
  salePrice: number;
}

interface ExchangeResponse {
  updateTs: string;
  branchOfficeId: string;
  items: Exchange[];
}

export async function getCotation() {
  try {
    const response = await fetch("/api/cambio");

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data: ExchangeResponse = await response.json();
    const dolar = data.items.find((item) => item.isoCode === "USD");
    const real = data.items.find((item) => item.isoCode === "BRL");

    if (dolar && real) {
      const dolarEmReaisCompra =
        (dolar.purchasePrice / real.purchasePrice) * 0.973;
      const dolarEmReaisVenda = (dolar.salePrice / real.salePrice) * 1.008;

      return {
        purchaseDolar: dolar.purchasePrice,
        saleDolar: dolar.salePrice,
        purchaseReal: real.purchasePrice,
        saleReal: real.salePrice,
        saleDolarReal: dolarEmReaisVenda,
        purchaseDolarReal: dolarEmReaisCompra,
      };
    }
  } catch (error) {
    console.error("Erro ao buscar cotação:", error);
  }
}
