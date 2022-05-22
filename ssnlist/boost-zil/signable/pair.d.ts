import { Signable } from "./shared";
import { Sendable } from "./types";
import { ByStr20 } from "./bystr";
export declare class Pair<F extends Signable, S extends Signable> extends Signable {
    value: [F, S];
    constructor(...v: [F, S]);
    toHash(): string;
    toSend(): Sendable;
    setADTname(s: string): this;
    setContractAddress(a: ByStr20): this;
}
