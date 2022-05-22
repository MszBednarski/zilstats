import createHash from "create-hash";
export class Signable {
    type;
    contractAddress;
    ADTname;
    setContractAddress(contractAddress) {
        this.contractAddress = contractAddress;
        return this;
    }
    setADTname(ADTname) {
        this.ADTname = ADTname;
        return this;
    }
    getType() {
        if (!this.type) {
            throw new Error("type was not defined!");
        }
        return this.type;
    }
}
/**
 * @param b
 * @returns hash of form `0x${sha.digest().toString("hex")}`
 */
export function sha256(b) {
    const sha = createHash("sha256");
    sha.update(Buffer.from(b, "hex"));
    return `0x${sha.digest().toString("hex")}`;
}
//# sourceMappingURL=shared.js.map