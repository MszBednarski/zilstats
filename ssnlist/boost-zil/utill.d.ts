import { Account } from "@zilliqa-js/account";
import { Signable } from "./signable/shared";
import { ByStr20, ByStr64 } from "./signable/bystr";
import { Uint128 } from "./signable";
export declare const normaliseAddress: (address: string) => string;
export declare function signWithAccount(cheque_hash: string, acc: Account): ByStr64;
export declare function concatHashed(...hashes: string[]): string;
export declare function getHashed<T extends Signable[]>(...hashes: T): {
    chequeHash: string;
    args: [...T];
};
/**
 * @dev signs the args in order like in the contracts implementation
 * appending the contract address | _this_address at the end of the sig payload
 */
export declare const signWithContractAddress: (contractAddress: ByStr20) => (account: Account) => <T extends Signable[]>(...args: T) => [...T, ByStr64];
/**
 * @dev signs the args in order like in the contracts implementation
 * appending the nonce transition name _this_address at the end of the sig payload
 */
export declare const signTransition: (contractAddress: ByStr20) => (transitionName: string) => (account: Account) => <T extends Signable[]>(...args: T) => {
    args: [...T, Uint128, ByStr64];
    chequeHash: string;
};
