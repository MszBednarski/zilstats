import { Signable } from "./shared";
import createHash from "create-hash";
function sha256String(s) {
    const sha = createHash("sha256");
    sha.update(s);
    return `0x${sha.digest().toString("hex")}`;
}
class StringSignable extends Signable {
    value;
    constructor(v) {
        super();
        this.value = v;
    }
}
export class BNum extends StringSignable {
    type = "BNum";
    constructor(v) {
        super(v);
    }
    toHash() {
        return sha256String(this.value);
    }
    toSend() {
        return this.value;
    }
}
export class ScillaString extends StringSignable {
    type = "String";
    constructor(v) {
        super(v);
    }
    toHash() {
        return sha256String(this.value);
    }
    toSend() {
        return this.value;
    }
}
//# sourceMappingURL=other.js.map