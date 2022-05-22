import { Signable, sha256 } from "./shared";
import { normaliseAddress } from "../utill";
import { toBech32Address } from "@zilliqa-js/crypto";
class ByStrSignable extends Signable {
    value;
    constructor(v) {
        super();
        this.value = v;
    }
}
class AnyByStr extends ByStrSignable {
    constructor(v) {
        let toSet = v.startsWith("0x") ? v : `0x${v}`;
        super(toSet);
    }
    toHash() {
        return sha256(this.value.toLowerCase().replace("0x", ""));
    }
    toSend() {
        return this.value.toLowerCase();
    }
}
export class ByStr20 extends ByStrSignable {
    type = "ByStr20";
    static zeroVal = "0x0000000000000000000000000000000000000000";
    constructor(v) {
        super(v);
    }
    toHash() {
        return sha256(normaliseAddress(this.value).replace("0x", ""));
    }
    /**
     * it returns the address without the 0x
     * it is used for JSON RPC requests to the Zilliqa blockchain API when giving it
     * address of the smart contract for instance to GetSmartContractState
     */
    noPrefixed() {
        return this.toSend().replace("0x", "");
    }
    /**
     * JSON RPC API requires lower case addresses for the indices of GetSmartContractSubState
     */
    lowerCase() {
        return this.toSend().toLowerCase();
    }
    toBech32() {
        return toBech32Address(this.toSend());
    }
    /**
     * sometimes useful
     * @returns 0x0000000000000000000000000000000000000000
     */
    static zeroByStr20() {
        return new ByStr20(ByStr20.zeroVal);
    }
    static isValid(s) {
        try {
            normaliseAddress(s);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    toSend() {
        if (this.value == ByStr20.zeroVal) {
            return this.value;
        }
        const res = normaliseAddress(this.value);
        if (!res) {
            throw new Error("spooky undefined address");
        }
        return res;
    }
}
export class ByStr33 extends AnyByStr {
    type = "ByStr33";
}
export class ByStr64 extends AnyByStr {
    type = "ByStr64";
}
export class ByStr extends AnyByStr {
    type = "ByStr";
}
//# sourceMappingURL=bystr.js.map