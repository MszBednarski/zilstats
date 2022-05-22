import { Signable } from "./shared";
declare abstract class ByStrSignable extends Signable {
    value: string;
    constructor(v: string);
}
declare abstract class AnyByStr extends ByStrSignable {
    constructor(v: string);
    toHash(): string;
    toSend(): string;
}
export declare class ByStr20 extends ByStrSignable {
    type: string;
    static zeroVal: string;
    constructor(v: string);
    toHash(): string;
    /**
     * it returns the address without the 0x
     * it is used for JSON RPC requests to the Zilliqa blockchain API when giving it
     * address of the smart contract for instance to GetSmartContractState
     */
    noPrefixed(): string;
    /**
     * JSON RPC API requires lower case addresses for the indices of GetSmartContractSubState
     */
    lowerCase(): string;
    toBech32(): string;
    /**
     * sometimes useful
     * @returns 0x0000000000000000000000000000000000000000
     */
    static zeroByStr20(): ByStr20;
    static isValid(s: string): boolean;
    toSend(): string;
}
export declare class ByStr33 extends AnyByStr {
    type: string;
}
export declare class ByStr64 extends AnyByStr {
    type: string;
}
export declare class ByStr extends AnyByStr {
    type: string;
}
export {};
