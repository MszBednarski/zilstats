import { Signable } from "./shared";
import { getHashed } from "../utill";
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
export class CustomADT extends Signable {
    value;
    constructor(...v) {
        super();
        this.value = v;
    }
    toHash() {
        return getHashed(...this.value).chequeHash;
    }
    toSend() {
        return {
            constructor: this.getType(),
            argtypes: [],
            arguments: this.value.map((v) => v.toSend()),
        };
    }
    setADTname(s) {
        this.type = s;
        this.ADTname = s;
        this.value.forEach((v) => v.setADTname(s));
        return this;
    }
    setContractAddress(a) {
        this.contractAddress = a;
        this.value.forEach((v) => v.setContractAddress(a));
        return this;
    }
    getType() {
        if (!this.contractAddress) {
            throw new Error("Contract name not set!");
        }
        if (!this.ADTname) {
            throw new Error("Custom ADT name not set!");
        }
        return `${this.contractAddress.toSend().toLowerCase()}.${this.ADTname}`;
    }
}
//# sourceMappingURL=customADT.js.map