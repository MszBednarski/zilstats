import { BN, units } from "@zilliqa-js/util";
import { Signable, sha256 } from "./shared";
import randomBytes from "randombytes";
class UintSignable extends Signable {
    value;
    constructor(v) {
        super();
        this.value = new BN(v);
    }
}
export class Uint32 extends UintSignable {
    type = "Uint32";
    constructor(v) {
        super(v);
    }
    toHash() {
        return sha256(this.value.toString("hex", 8));
    }
    toSend() {
        return this.value.toString();
    }
}
export class Uint128 extends UintSignable {
    type = "Uint128";
    constructor(v) {
        super(v);
    }
    toHash() {
        return sha256(this.value.toString("hex", 32));
    }
    toSend() {
        return this.value.toString();
    }
    static getRandom() {
        return new Uint128(new BN(randomBytes(16).toString("hex"), "hex"));
    }
    static zil(v) {
        return new Uint128(units.toQa(v, units.Units.Zil));
    }
}
//# sourceMappingURL=uint.js.map