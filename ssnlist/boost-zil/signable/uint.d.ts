/// <reference types="bn.js" />
import { BN } from "@zilliqa-js/util";
import { Signable } from "./shared";
declare abstract class UintSignable extends Signable {
    value: BN;
    constructor(v: string | BN);
}
export declare class Uint32 extends UintSignable {
    type: string;
    constructor(v: string | BN);
    toHash(): string;
    toSend(): string;
}
export declare class Uint128 extends UintSignable {
    type: string;
    constructor(v: string | BN);
    toHash(): string;
    toSend(): string;
    static getRandom(): Uint128;
    static zil(v: string | BN): Uint128;
}
export {};
