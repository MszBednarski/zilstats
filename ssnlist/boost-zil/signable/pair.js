import { Signable } from "./shared";
import { getHashed } from "../utill";
export class Pair extends Signable {
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
            constructor: "Pair",
            argtypes: this.value.map((v) => v.getType()),
            arguments: this.value.map((v) => v.toSend()),
        };
    }
    setADTname(s) {
        this.ADTname = s;
        this.value.forEach((v) => v.setADTname(s));
        return this;
    }
    setContractAddress(a) {
        this.contractAddress = a;
        this.value.forEach((v) => v.setContractAddress(a));
        return this;
    }
}
//# sourceMappingURL=pair.js.map