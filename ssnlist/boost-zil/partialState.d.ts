import { ByStr20 } from "./signable";
import "isomorphic-fetch";
import { Zilliqa } from "@zilliqa-js/zilliqa";
export interface ContractSubStateQuery {
    [key: string]: "*" | ContractSubStateQuery | undefined;
}
export declare type ContractSubStateQueryCast<Keys extends string> = Partial<{
    [Key in Keys]: "*" | ContractSubStateQuery;
}>;
export declare const toAddrKey: (s: string) => string;
export declare type ReplaceStar<T> = {
    [P in keyof T]: T[P] extends "*" ? any : T[P] extends {} ? ReplaceStar<T[P]> : T[P];
};
declare type IsTrue<Condition, Result = {}> = Condition extends "true" ? Result & {
    _scilla_version: string;
    _creation_block: string;
    _this_address: string;
} : {};
export declare const partialState: (getZil: () => Zilliqa) => <T extends ContractSubStateQuery, E extends "true" | "false", B extends {
    includeInit: E;
    contractAddress: ByStr20;
    query: T;
}, Init extends {}>(...partial: B[]) => Promise<(ReplaceStar<T> & {
    _init: IsTrue<E, Init>;
})[]>;
export {};
