export async function getRates() {
    const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=zilliqa&vs_currencies=usd,gbp"
    );

    const rates = (await res.json()) as {
        zilliqa: { usd: number; gbp: number };
    };
    return rates;
}
