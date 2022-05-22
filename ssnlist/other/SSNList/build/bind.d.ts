/** @format */
import { Long } from "@zilliqa-js/util";
import { Transaction } from "@zilliqa-js/account";
import { Contract } from "@zilliqa-js/contract";
import * as T from "../../../boost-zil/signable";
import { Zilliqa } from "@zilliqa-js/zilliqa";
/**
 * this string is the signature of the hash of the source code
 * that was used to generate this sdk
 */
export declare const contractSignature = "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
export interface SDKResolvers {
    getZil: () => Zilliqa;
    getVersion: () => number;
    getNetworkName: () => string;
    txLog?: (t: Transaction, msg: string) => void;
}
/**
 * general interface of the data returned by toJSON() on the transitions
 */
declare type TransactionData = {
    /**
     * the signature hash of the source code of the contract that this data interacts with
     */
    contractSignature: string;
    /**
     * contract to send the transaction to
     */
    contractAddress: string;
    /**
     * zil amount to send
     */
    amount: string;
    /**
     * the name of the transition called in the target contract
     */
    contractTransitionName: string;
    data: any[];
};
export declare const SSNList: (resolvers: SDKResolvers) => {
    /**
     * will try to send a transaction to the contract
     * @warning WILL NOT THROW ERRORS IF CONTRACT SIGNATURES ARE INVALID
     */
    dangerousFromJSONTransaction: (t: TransactionData, gasLimit: Long) => Promise<Transaction>;
    deploy: (gasLimit: Long, __init_admin: T.ByStr20, __init_proxy_address: T.ByStr20, __init_gzil_address: T.ByStr20) => Promise<{
        tx: Transaction;
        contract: Contract;
        address: T.ByStr20;
    }>;
    state: <E extends "true" | "false", Query extends Partial<{
        ssnlist: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        comm_for_ssn: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        deposit_amt_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        ssn_deleg_amt: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        buff_deposit_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        direct_deposit_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        last_withdraw_cycle_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        last_buf_deposit_cycle_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        stake_ssn_per_cycle: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        deleg_stake_per_cycle: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        withdrawal_pending: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        deleg_swap_request: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        bnum_req: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        cycle_rewards_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        verifier_reward: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        available_withdrawal: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        current_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        current_ssn: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        new_deleg: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        verifier: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        verifier_receiving_addr: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        minstake: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        mindelegstake: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        contractadmin: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        stagingcontractadmin: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        gziladdr: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        lastrewardcycle: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        paused: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        maxcommchangerate: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        maxcommrate: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
        totalstakeamount: "*" | import("../../../boost-zil/partialState").ContractSubStateQuery;
    }>>(query: Query, includeInit: E) => {
        get: (...contractAddresses: T.ByStr20[]) => Promise<(import("../../../boost-zil/partialState").ReplaceStar<Query> & {
            _init: E extends "true" ? {
                init_admin: any;
                init_proxy_address: any;
                init_gzil_address: any;
            } & {
                _scilla_version: string;
                _creation_block: string;
                _this_address: string;
            } : {};
        })[]>;
    };
    /**
     * interface for scilla contract with source code hash:
     * 0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
     */
    calls: (a: T.ByStr20) => (gasLimit: Long) => {
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_Pause: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        Pause: (__initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UnPause: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UnPause: (__initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateAdmin: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateAdmin: (__admin: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_ClaimAdmin: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        ClaimAdmin: (__initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateVerifier: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateVerifier: (__verif: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateVerifierRewardAddr: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateVerifierRewardAddr: (__addr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateStakingParameters: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateStakingParameters: (__min_stake: T.Uint128, __min_deleg_stake: T.Uint128, __max_comm_change_rate: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_ChangeBNumReq: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        ChangeBNumReq: (__input_bnum_req: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateGzilAddr: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateGzilAddr: (__gzil_addr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_AddSSN: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        AddSSN: (__ssnaddr: T.ByStr20, __name: T.ScillaString, __urlraw: T.ScillaString, __urlapi: T.ScillaString, __comm: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateSSN: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateSSN: (__ssnaddr: T.ByStr20, __new_name: T.ScillaString, __new_urlraw: T.ScillaString, __new_urlapi: T.ScillaString, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateComm: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateComm: (__new_rate: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_WithdrawComm: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        WithdrawComm: (__initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateReceivingAddr: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateReceivingAddr: (__new_addr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_DelegateStake: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        DelegateStake: (amount: T.Uint128, __ssnaddr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_WithdrawStakeRewards: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        WithdrawStakeRewards: (__ssnaddr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_WithdrawStakeAmt: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        WithdrawStakeAmt: (__ssnaddr: T.ByStr20, __amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_CompleteWithdrawal: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        CompleteWithdrawal: (__initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_ReDelegateStake: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        ReDelegateStake: (__ssnaddr: T.ByStr20, __to_ssn: T.ByStr20, __amount: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_AssignStakeReward: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        AssignStakeReward: (amount: T.Uint128, __ssnreward_list: T.List<T.Pair<T.ByStr20, T.Uint128>>, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: import("../../../boost-zil/signable/types").Sendable;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_AddFunds: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        AddFunds: (amount: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_AddSSNAfterUpgrade: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        AddSSNAfterUpgrade: (__ssnaddr: T.ByStr20, __stake_amt: T.Uint128, __rewards: T.Uint128, __name: T.ScillaString, __urlraw: T.ScillaString, __urlapi: T.ScillaString, __buff_deposit: T.Uint128, __comm: T.Uint128, __comm_rewards: T.Uint128, __rec_addr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_UpdateDeleg: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        UpdateDeleg: (__ssnaddr: T.ByStr20, __deleg: T.ByStr20, __stake_amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateStakeSSNPerCycle: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateStakeSSNPerCycle: (__ssn_addr: T.ByStr20, __cycle: T.Uint32, __totalAmt: T.Uint128, __rewards: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateLastWithdrawCycleForDeleg: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateLastWithdrawCycleForDeleg: (__deleg_addr: T.ByStr20, __ssn_addr: T.ByStr20, __cycle: T.Uint32, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateLastBufDepositCycleDeleg: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateLastBufDepositCycleDeleg: (__deleg_addr: T.ByStr20, __ssn_addr: T.ByStr20, __cycle: T.Uint32, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateBuffDeposit: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateBuffDeposit: (__deleg_addr: T.ByStr20, __ssn_addr: T.ByStr20, __cycle: T.Uint32, __amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateDirectDeposit: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateDirectDeposit: (__deleg_addr: T.ByStr20, __ssn_addr: T.ByStr20, __cycle: T.Uint32, __amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateDepositAmtDeleg: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateDepositAmtDeleg: (__deleg_addr: T.ByStr20, __ssn_addr: T.ByStr20, __amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateDelegStakePerCycle: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateDelegStakePerCycle: (__deleg_addr: T.ByStr20, __ssn_addr: T.ByStr20, __cycle: T.Uint32, __amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateLastRewardCycle: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateLastRewardCycle: (__cycle: T.Uint32, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateCommForSSN: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateCommForSSN: (__ssn_addr: T.ByStr20, __cycle: T.Uint32, __comm: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateTotalStakeAmt: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateTotalStakeAmt: (__amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulatePendingWithdrawal: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulatePendingWithdrawal: (__ssn_addr: T.ByStr20, __block_number: T.BNum, __stake: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_PopulateDelegSwapRequest: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        PopulateDelegSwapRequest: (__requestor: T.ByStr20, __new_deleg_addr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_DrainContractBalance: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        DrainContractBalance: (__amt: T.Uint128, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_RequestDelegatorSwap: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        RequestDelegatorSwap: (__new_deleg_addr: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_ConfirmDelegatorSwap: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        ConfirmDelegatorSwap: (__requestor: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_RevokeDelegatorSwap: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        RevokeDelegatorSwap: (__initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
        /**
         * returns a signer that given an account will sign transition params in such manner:
         * ...params, nonce, transition name, contract address
         * */
        sign_RejectDelegatorSwap: (account: import("@zilliqa-js/account").Account) => <T extends import("../../../boost-zil/signable/shared").Signable[]>(...args: T) => {
            args: [...T, T.Uint128, T.ByStr64];
            chequeHash: string;
        };
        RejectDelegatorSwap: (__requestor: T.ByStr20, __initiator: T.ByStr20) => {
            /**
             * get data needed to perform this transaction
             * */
            toJSON: () => {
                contractAddress: string;
                contractTransitionName: string;
                data: {
                    type: string;
                    vname: string;
                    value: string;
                }[];
                amount: string;
                contractSignature: "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            };
            /**
             * send the transaction to the blockchain
             * */
            send: () => Promise<Transaction>;
        };
    };
};
export {};
