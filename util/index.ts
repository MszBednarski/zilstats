import { Zilliqa, BN, bytes } from "@zilliqa-js/zilliqa";
import Big from "big.js";

export function getZil() {
    return new Zilliqa("https://api.zilliqa.com/");
}
export function getVersion() {
    return bytes.pack(1, 1);
}
export function getNetworkName() {
    return "mainnet";
}

export function notArr(s: string | string[] | undefined) {
    if (!s) return "";
    return typeof s == "string" ? s : s.join("");
}

export function BNFractionMultiply(
    b: BN,
    decimals: number,
    fraction: number,
    precision = 2
) {
    return new Big(BNToDisp(b, decimals, decimals - 1))
        .mul(fraction)
        .toFixed(precision);
}

export function BNIntegerPart(b: BN, decimals: number) {
    return b.div(new BN(10).pow(new BN(decimals)));
}

export function BNToInt(b: BN, decimal: number) {
    return BNIntegerPart(b, decimal).toNumber();
}

export function BNToDisp(b: BN, decimals: number, precision = 4) {
    const decimalsBase = new BN(10).pow(new BN(decimals));
    const integers = BNIntegerPart(b, decimals);
    const fractionPart = b.mod(decimalsBase);

    let fractionPartString = fractionPart.toString();

    while (fractionPartString.length < decimals) {
        fractionPartString = "0" + fractionPartString;
    }

    fractionPartString = fractionPartString.substring(0, precision);

    return `${integers.toString()}.${fractionPartString}`;
}
