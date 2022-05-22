import { Signable } from "./shared";
import { Sendable } from "./types";
import { ByStr20 } from "./bystr";
export declare class List<T extends Signable> extends Signable {
    value: T[];
    constructor(v: T[]);
    toHash(): string;
    toSend(): Sendable;
    setADTname(s: string): this;
    setContractAddress(a: ByStr20): this;
    getType(): string;
}
