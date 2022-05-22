import { Signable } from "./shared";
import { Sendable } from "./types";
import { ByStr20 } from "./bystr";
/**
 * {
    tname: string;
    tparams: string[];
    tmap: {
        cname: string;
        argtypes: string[];
    }[];
    {
        constructor: `${addr}.Uint128Pair`,
        argtypes: [],
        arguments: [threshold.toString(), discount.toString()],
    }
}
 */
export declare class CustomADT<T extends Signable[]> extends Signable {
    value: T;
    constructor(...v: T);
    toHash(): string;
    toSend(): Sendable;
    setADTname(s: string): this;
    setContractAddress(a: ByStr20): this;
    getType(): string;
}
