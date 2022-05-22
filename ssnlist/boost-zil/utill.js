import { sign } from "@zilliqa-js/crypto";
import { ByStr64 } from "./signable/bystr";
import { ScillaString, Uint128 } from "./signable";
import { fromBech32Address, toChecksumAddress } from "@zilliqa-js/zilliqa";
import { validation } from "@zilliqa-js/util";
export const normaliseAddress = (address) => {
    if (validation.isBech32(address)) {
        return fromBech32Address(address);
    }
    if (!validation.isAddress(address.replace("0x", ""))) {
        throw Error("Wrong address format, should be either bech32 or checksummed address");
    }
    return toChecksumAddress(address);
};
export function signWithAccount(cheque_hash, acc) {
    return new ByStr64(`0x${sign(Buffer.from(cheque_hash.replace("0x", ""), "hex"), acc.privateKey, acc.publicKey)}`);
}
export function concatHashed(...hashes) {
    return `0x${hashes.reduce((prev, cur) => prev + cur.replace("0x", ""), "")}`;
}
export function getHashed(...hashes) {
    return {
        args: hashes,
        chequeHash: concatHashed(...hashes.map((a) => a.toHash())),
    };
}
/**
 * @dev signs the args in order like in the contracts implementation
 * appending the contract address | _this_address at the end of the sig payload
 */
export const signWithContractAddress = (addr) => (acc) => (...args) => {
    const res = getHashed(...args, addr);
    const signature = signWithAccount(res.chequeHash, acc);
    return [...args, signature];
};
/**
 * @dev signs the args in order like in the contracts implementation
 * appending the nonce transition name _this_address at the end of the sig payload
 */
export const signTransition = (addr) => (name) => (acc) => (...args) => {
    const nonce = Uint128.getRandom();
    const { chequeHash } = getHashed(...args, nonce, new ScillaString(name), addr);
    const signature = signWithAccount(chequeHash, acc);
    return {
        args: [...args, nonce, signature],
        chequeHash,
    };
};
//# sourceMappingURL=utill.js.map