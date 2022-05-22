import { Signable } from "./shared";
import { getHashed } from "../utill";
export class List extends Signable {
    value;
    constructor(v) {
        super();
        this.value = v;
    }
    toHash() {
        return getHashed(...this.value).chequeHash;
    }
    toSend() {
        return this.value.map((v) => v.toSend());
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
    getType() {
        return `List (${this.value[0].getType()})`;
    }
}
//# sourceMappingURL=list.js.map