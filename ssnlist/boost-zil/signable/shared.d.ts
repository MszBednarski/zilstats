import { Sendable } from "./types";
import { ByStr20 } from ".";
export declare abstract class Signable {
    abstract value: any;
    type?: string;
    contractAddress?: ByStr20;
    ADTname?: string;
    abstract toHash(): string;
    abstract toSend(): Sendable;
    setContractAddress(contractAddress: ByStr20): this;
    setADTname(ADTname: string): this;
    getType(): string;
}
/**
 * @param b
 * @returns hash of form `0x${sha.digest().toString("hex")}`
 */
export declare function sha256(b: string): string;
