/** @format */
import { BN } from "@zilliqa-js/util";
import * as T from "../../../boost-zil/signable";
import { signTransition } from "../../../boost-zil/utill";
import { partialState, } from "../../../boost-zil/partialState";
/**
 * this string is the signature of the hash of the source code
 * that was used to generate this sdk
 */
export const contractSignature = "hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const sig = { contractSignature };
const RED = "\x1B[31m%s\x1b[0m";
const CYAN = "\x1B[36m%s\x1b[0m";
const GREEN = "\x1B[32m%s\x1b[0m";
const MAGENTA = "\x1B[35m%s\x1b[0m";
function getContract(zil, a) {
    const address = new T.ByStr20(a).toSend();
    //@ts-ignore
    return zil.contracts.at(address);
}
function newContract(zil, code, init) {
    //@ts-ignore
    return zil.contracts.new(code, init);
}
async function getMinGasPrice(zil) {
    const res = await zil.blockchain.getMinimumGasPrice();
    if (!res.result) {
        throw "no gas price";
    }
    return new BN(res.result);
}
export const SSNList = (resolvers) => {
    const defaultTxLog = (t, msg) => {
        const id = t.id;
        const url = `https://viewblock.io/zilliqa/tx/0x${id}?network=${getNetworkName()}`;
        console.log(MAGENTA, msg);
        const receipt = t.getReceipt();
        if (receipt) {
            if (receipt.success) {
                console.log(GREEN, "Success.");
            }
            else {
                console.log(RED, "Failed.");
                if (receipt.errors) {
                    Object.entries(receipt.errors).map(([k, v]) => {
                        console.log(RED, v);
                    });
                }
            }
        }
        console.log(CYAN, url);
    };
    const { getZil, getVersion, getNetworkName } = resolvers;
    const txLink = resolvers.txLog ? resolvers.txLog : defaultTxLog;
    return {
        /**
         * will try to send a transaction to the contract
         * @warning WILL NOT THROW ERRORS IF CONTRACT SIGNATURES ARE INVALID
         */
        dangerousFromJSONTransaction: async (t, gasLimit) => {
            const zil = getZil();
            const gasPrice = await getMinGasPrice(zil);
            const contract = getContract(zil, new T.ByStr20(t.contractAddress).toSend());
            const tx = await contract.call(t.contractTransitionName, t.data, {
                version: getVersion(),
                amount: new BN(t.amount),
                gasPrice,
                gasLimit,
            }, 33, 1000);
            txLink(tx, t.contractTransitionName);
            return tx;
        },
        deploy: async (gasLimit, __init_admin, __init_proxy_address, __init_gzil_address) => {
            const zil = getZil();
            const gasPrice = await getMinGasPrice(zil);
            const code = `
(* sourceCodeHash=0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 *)
(* sourceCodeHashKey=hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 *)
scilla_version 0

import ListUtils IntUtils PairUtils

library SSNList





























type Ssn =
| Ssn of Bool Uint128 Uint128 String String String Uint128 Uint128 Uint128 ByStr20







type SsnStakeRewardShare = 
| SsnStakeRewardShare of ByStr20 Uint128 Uint128









type SSNCycleInfo =
| SSNCycleInfo of Uint128 Uint128




type TmpArg =
| TmpArg of ByStr20 ByStr20 Uint32

let one_msg =
  fun (m : Message) =>
    let e = Nil {Message} in
    Cons {Message} m e

let uint128_one =  Uint128 1
let uint128_zero = Uint128 0
let uint128_10_power_7 = Uint128 10000000
let uint128_10_power_9 = Uint128 1000000000
let uint128_100 = Uint128 100

let uint32_one = Uint32 1
let uint32_zero = Uint32 0

let option_value =
  tfun 'A =>
  fun (default: 'A) =>
  fun (opt_val: Option 'A) =>
    match opt_val with
    | Some v => v
    | None => default
    end

let option_map_uint128_uint128_value =
  let f = @option_value (Map Uint128 Uint128) in
  let emt = Emp Uint128 Uint128 in
  f emt

let option_uint128_value =
  let f = @option_value Uint128 in
  f uint128_zero
  
let option_uint32_value =
  let f = @option_value Uint32 in
  f uint32_zero

let sub_one_to_zero =
  fun (x: Uint32) =>
  let less_than_one = builtin lt x uint32_one in
  match less_than_one with
  | True =>
    uint32_zero
  | False =>
    let res = builtin sub x uint32_one in
    res
  end

let option_add =
  fun (x_opt: Option Uint128) =>
  fun (y_opt: Option Uint128) =>
    match x_opt with
    | Some x =>
      let y = option_uint128_value y_opt in
      let res = builtin add x y in
      Some {Uint128} res
    | None => y_opt
    end

let change_rate =
  fun (old: Uint128) =>
  fun (new: Uint128) =>
    let a = builtin lt old new in
    match a with
    | True =>
      builtin sub new old
    | False =>
      builtin sub old new
    end

let iota : Uint32 -> Uint32 -> List Uint32 =
  fun (m : Uint32) => fun (n : Uint32) =>
    let m_lt_n = builtin lt m n in
    match m_lt_n with
    | True =>
        let delta = builtin sub n m in
        let delta_nat = builtin to_nat delta in
        let nil = Nil {Uint32} in
        let acc_init = Pair {(List Uint32) Uint32} nil n in
        let one = Uint32 1 in
        let step = fun (xs_n : Pair (List Uint32) Uint32) => fun (ignore : Nat) =>
          match xs_n with
          | Pair xs n =>
              let new_n = builtin sub n one in
              let new_xs = Cons {Uint32} new_n xs in
              Pair {(List Uint32) Uint32} new_xs new_n
          end in
        let fold = @nat_fold (Pair (List Uint32) Uint32) in
        let xs_m = fold step acc_init delta_nat in
        match xs_m with
        | Pair xs m => xs
        end
    | False => Nil {Uint32}
    end


let uint128_to_uint256 : Uint128 -> Uint256 =
  fun (x : Uint128) =>
    let ox256 = builtin to_uint256 x in
      match ox256 with
      | None =>
        
        let zero = Uint256 0 in
        builtin div zero zero
      | Some x256 => x256
      end


let muldiv : Uint128 -> Uint128 -> Uint128 -> Uint128 =
    fun (x : Uint128) =>
    fun (y : Uint128) =>
    fun (z : Uint128) =>
      let x256 = uint128_to_uint256 x in
      let y256 = uint128_to_uint256 y in
      let z256 = uint128_to_uint256 z in
      let x_mul_y256 = builtin mul x256 y256 in
      let res256 = builtin div x_mul_y256 z256 in
      let ores128 = builtin to_uint128 res256 in
      match ores128 with
      | None =>
        
        let max_uint128 = Uint128 340282366920938463463374607431768211455 in
        let fourtytwo128 = Uint128 42 in
        builtin mul max_uint128 fourtytwo128
      | Some res128 =>
        res128
      end

let map_to_stake_rewards = 
  fun (total_stake: Uint128) =>
  fun (element: Pair ByStr20 Uint128) =>
    match element with
    | Pair ssnaddr cycle_reward => SsnStakeRewardShare ssnaddr cycle_reward total_stake 
    end

let bool_active = True
let bool_inactive = False
let addfunds_tag = "AddFunds"


let reset_addr = 0x0000000000000000000000000000000000000000

type Error =
  | ContractFrozenFailure
  | VerifierValidationFailed
  | AdminValidationFailed
  | StagingAdminNotExist
  | StagingAdminValidationFailed
  | ProxyValidationFailed
  | DelegDoesNotExistAtSSN
  | DelegHasBufferedDeposit
  | ChangeCommError
  | SSNNotExist
  | SSNAlreadyExist
  | DelegHasUnwithdrawRewards
  | DelegHasNoSufficientAmt
  | SSNNoComm
  | DelegStakeNotEnough
  | ExceedMaxChangeRate
  | ExceedMaxCommRate
  | InvalidTotalAmt
  | VerifierNotSet
  | VerifierRecvAddrNotSet
  | ReDelegInvalidSSNAddr
  | AvailableRewardsError
  | InvalidSwapAddr
  | SwapAddrValidationFailed
  | SwapAddrAlreadyExistsAsRequest

let make_error =
  fun (result: Error) =>
    let result_code =
      match result with
      | ContractFrozenFailure => Int32 -1
      | VerifierValidationFailed => Int32 -2
      | AdminValidationFailed => Int32 -3
      | StagingAdminNotExist => Int32 -4
      | StagingAdminValidationFailed => Int32 -5
      | ProxyValidationFailed => Int32 -6
      | DelegDoesNotExistAtSSN => Int32 -7
      | DelegHasBufferedDeposit => Int32 -8
      | ChangeCommError => Int32 -9
      | SSNNotExist => Int32 -10
      | SSNAlreadyExist => Int32 -11
      | DelegHasUnwithdrawRewards => Int32 -12
      | DelegHasNoSufficientAmt => Int32 -13
      | SSNNoComm => Int32 -14
      | DelegStakeNotEnough => Int32 -15
      | ExceedMaxChangeRate => Int32 -16
      | ExceedMaxCommRate => Int32 -17
      | InvalidTotalAmt => Int32 -18
      | VerifierNotSet => Int32 -19
      | VerifierRecvAddrNotSet => Int32 -20
      | ReDelegInvalidSSNAddr => Int32 -21
      | AvailableRewardsError => Int32 -22
      | InvalidSwapAddr => Int32 -23
      | SwapAddrValidationFailed => Int32 -24
      | SwapAddrAlreadyExistsAsRequest => Int32 -25
      end
    in
    { _exception: "Error"; code: result_code }



contract SSNList(
  init_admin: ByStr20,
  init_proxy_address: ByStr20,
  init_gzil_address: ByStr20
)



field ssnlist: Map ByStr20 Ssn = Emp ByStr20 Ssn



field comm_for_ssn: Map ByStr20 (Map Uint32 Uint128) = Emp ByStr20 (Map Uint32 Uint128)





field deposit_amt_deleg: Map ByStr20 (Map ByStr20 Uint128) = Emp ByStr20 (Map ByStr20 Uint128)



field ssn_deleg_amt: Map ByStr20 (Map ByStr20 Uint128) = Emp ByStr20 (Map ByStr20 Uint128)




field buff_deposit_deleg: Map ByStr20 (Map ByStr20 (Map Uint32 Uint128)) = Emp ByStr20 (Map ByStr20 (Map Uint32 Uint128))



field direct_deposit_deleg: Map ByStr20 (Map ByStr20 (Map Uint32 Uint128)) = Emp ByStr20 (Map ByStr20 (Map Uint32 Uint128))





field last_withdraw_cycle_deleg: Map ByStr20 (Map ByStr20 Uint32) = Emp ByStr20 (Map ByStr20 Uint32)



field last_buf_deposit_cycle_deleg: Map ByStr20 (Map ByStr20 Uint32) = Emp ByStr20 (Map ByStr20 Uint32)


field stake_ssn_per_cycle: Map ByStr20 (Map Uint32 SSNCycleInfo) = Emp ByStr20 (Map Uint32 SSNCycleInfo)


field deleg_stake_per_cycle: Map ByStr20 (Map ByStr20 (Map Uint32 Uint128)) = Emp ByStr20 (Map ByStr20 (Map Uint32 Uint128))


field withdrawal_pending: Map ByStr20 (Map BNum Uint128) = Emp ByStr20 (Map BNum Uint128)




field deleg_swap_request: Map ByStr20 ByStr20 = Emp ByStr20 ByStr20

field bnum_req: Uint128 = Uint128 24000


field cycle_rewards_deleg: Uint128 = uint128_zero



field verifier_reward: Uint128 = uint128_zero

field available_withdrawal: Uint128 = uint128_zero

field current_deleg: Option ByStr20 = None {ByStr20}



field current_ssn: Option ByStr20 = None {ByStr20}



field new_deleg: Option ByStr20 = None {ByStr20}

field verifier: Option ByStr20 = None {ByStr20}

field verifier_receiving_addr: Option ByStr20 = None {ByStr20}


field minstake: Uint128 = Uint128 10000000000000000000


field mindelegstake: Uint128 = Uint128 10000000000000

field contractadmin: ByStr20  = init_admin
field stagingcontractadmin: Option ByStr20 = None {ByStr20}
field gziladdr: ByStr20 = init_gzil_address
field lastrewardcycle: Uint32 = uint32_one
field paused: Bool = True


field maxcommchangerate: Uint128 = uint128_one


field maxcommrate: Uint128 = Uint128 1000000000
field totalstakeamount: Uint128 = uint128_zero



procedure TruncateDeleg(deleg: ByStr20, ssnaddr: ByStr20)
  delete deposit_amt_deleg[deleg][ssnaddr];
  delete ssn_deleg_amt[ssnaddr][deleg];
  delete buff_deposit_deleg[deleg][ssnaddr];
  delete direct_deposit_deleg[deleg][ssnaddr];
  delete last_withdraw_cycle_deleg[deleg][ssnaddr];
  delete deleg_stake_per_cycle[deleg][ssnaddr];
  delete last_buf_deposit_cycle_deleg[deleg][ssnaddr]
end

procedure ThrowError(err: Error)
  e = make_error err;
  throw e
end

procedure ValidateRate(rate: Uint128)
  max_rate <- maxcommrate;
  validate = uint128_le rate max_rate;
  match validate with
  | True =>
  | False =>
    e = ExceedMaxCommRate;
    ThrowError e
  end
end

procedure ValidateChangeRate(old: Uint128, new: Uint128)
  maxcommchangerate_l <- maxcommchangerate;
  absolute_change = change_rate old new;
  absolute_change = builtin div absolute_change uint128_10_power_7;
  valid = uint128_le absolute_change maxcommchangerate_l;
  match valid with
  | True =>
  | False =>
    e = ExceedMaxChangeRate;
    ThrowError e
  end
end

procedure IncreaseTotalStakeAmt(amt: Uint128)
  current_amt <- totalstakeamount;
  new_amt = builtin add current_amt amt;
  totalstakeamount := new_amt
end

procedure DecreaseTotalStakeAmt(amt: Uint128)
  current_amt <- totalstakeamount;
  valid = uint128_le amt current_amt;
  match valid with
  | True =>
    new_amt = builtin sub current_amt amt;
    totalstakeamount := new_amt
  | False =>
    e = InvalidTotalAmt;
    ThrowError e
  end
end

procedure IncreaseTotalStakeAmtOnStatus(amt: Uint128, status: Bool)
  match status with
  | True =>
    e = { _eventname: "SSNActive"; increase_amt: amt };
    event e;
    IncreaseTotalStakeAmt amt
  | False =>
  end  
end

procedure DecreaseTotalStakeAmtOnStatus(amt: Uint128, status: Bool)
  match status with
  | True =>
  | False =>
    e = { _eventname: "SSNInactive"; decreased_amt: amt };
    event e;
    DecreaseTotalStakeAmt amt
  end
end


procedure CallerIsVerifier(initiator: ByStr20)
  verifier_tmp <- verifier;
  match verifier_tmp with
  | Some v =>
    is_verifier = builtin eq initiator v;
    match is_verifier with
    | True =>
    | False =>
      e = VerifierValidationFailed;
      ThrowError e
    end
  | None =>
    e = VerifierNotSet;
    ThrowError e
  end
end


procedure IsAdmin(initiator: ByStr20)
  contractadmin_tmp <- contractadmin;
  is_admin = builtin eq initiator contractadmin_tmp;
  match is_admin with
  | True  =>
  | False =>
    e = AdminValidationFailed;
    ThrowError e
  end
end


procedure IsProxy()
  is_proxy = builtin eq _sender init_proxy_address;
  match is_proxy with
  | True  =>
  | False =>
    e = ProxyValidationFailed;
    ThrowError e
  end
end


procedure IsNotPaused()
  paused_tmp <- paused;
  match paused_tmp with
  | False =>
  | True  =>
    e = ContractFrozenFailure;
    ThrowError e
  end
end


procedure IsPaused()
  paused_tmp <- paused;
  match paused_tmp with
  | False =>
    e = ContractFrozenFailure;
    ThrowError e
  | True => 
  end
end

procedure TransferFunds(tag: String, amt: Uint128, recipient: ByStr20)
    msg = {_tag: tag; _recipient: recipient; _amount: amt};
    msgs = one_msg msg;
    send msgs
end


procedure CalculateTotalWithdrawal(withdraw: Pair BNum Uint128)
  current_deleg_o <- current_deleg;
  match current_deleg_o with
  | Some deleg =>
    match withdraw with
    | Pair withdraw_number amt =>
      current_bnum <- & BLOCKNUMBER;
      current_bnum_req <- bnum_req;
      bnum = builtin badd withdraw_number current_bnum_req;
      can_withdraw = builtin blt bnum current_bnum;
      match can_withdraw with
      | True =>
          delete withdrawal_pending[deleg][withdraw_number];
          current_amt <- available_withdrawal;
          current_amt = builtin add current_amt amt;
          available_withdrawal := current_amt;
          has_other_records <- withdrawal_pending[deleg];
          match has_other_records with
          | Some inner =>
          | None =>
            delete withdrawal_pending[deleg]
          end
      | False => 
      end
    end
  | None => 
  end
end

procedure AssertCorrectRewards(remaining_rewards: Uint128, ssn_rewards: Uint128)
  validate = uint128_le ssn_rewards remaining_rewards;
  match validate with
  | True =>
  | False =>
    e = AvailableRewardsError;
    ThrowError e
  end
end

procedure UpdateStakeReward(entry: SsnStakeRewardShare)
  lastreward_blk <- lastrewardcycle;
  match entry with
  | SsnStakeRewardShare ssnaddr cycle_reward total_stake =>
    curval <- ssnlist[ssnaddr];
    match curval with
    | None =>
      e = SSNNotExist;
      ThrowError e
    | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
      match active_status with
      | False =>
        e = { _eventname: "SSN inactive"; ssn_addr: ssnaddr};
        event e
      | True  =>
        
        new_rewards = muldiv stake_amt cycle_reward total_stake;
        current_verifier_reward <- verifier_reward;

        AssertCorrectRewards current_verifier_reward new_rewards;
        new_current_verifier_reward = builtin sub current_verifier_reward new_rewards;
        verifier_reward := new_current_verifier_reward;

        
        reward_comm_tmp = muldiv new_rewards comm uint128_10_power_9;
        total_reward_comm = builtin add reward_comm_tmp comm_rewards;

        
        delegate_reward = builtin sub new_rewards reward_comm_tmp;

        p = SSNCycleInfo stake_amt delegate_reward;
        stake_ssn_per_cycle[ssnaddr][lastreward_blk] := p;

        
        new_stake_amt = builtin add stake_amt buffdeposit;
        deleg_reward = builtin add delegate_reward rewards;
        ssn = Ssn active_status new_stake_amt deleg_reward name urlraw urlapi uint128_zero comm total_reward_comm rec_addr;
        ssnlist[ssnaddr] := ssn;
        IncreaseTotalStakeAmt buffdeposit;
        e = { _eventname: "SSN assign reward"; ssnaddr: ssnaddr; cycle_number: lastreward_blk; delegate_rewards: delegate_reward; comm_rewards:  reward_comm_tmp};
        event e
      end
    end
  end
end


procedure SendDelegRewards(addr: ByStr20, amt: Uint128)
  to_send = builtin eq amt uint128_zero;
  match to_send with
  | True =>
  | False =>
    TransferFunds addfunds_tag amt addr;
    e = { _eventname: "Send deleg rewards"; addr: addr; amt:  amt};
    event e
  end
end


procedure DelegExists(ssnaddr: ByStr20, deleg: ByStr20)
  if_exists <- exists deposit_amt_deleg[deleg][ssnaddr];
  match if_exists with
  | True  =>
  | False =>
    e = DelegDoesNotExistAtSSN;
    ThrowError e
    end
end

procedure FillLastWithdrawCycle(ssnaddr: ByStr20, deleg : ByStr20)
  lwcd_o <- last_withdraw_cycle_deleg[deleg][ssnaddr];
  match lwcd_o with
  | Some lwcd =>
  | None =>
    lrc <- lastrewardcycle;
    last_withdraw_cycle_deleg[deleg][ssnaddr] := lrc
  end
end

procedure FillInDepositDelegAmt(ssnaddr: ByStr20, deleg: ByStr20, amount: Uint128)
  deposit_amt <- deposit_amt_deleg[deleg][ssnaddr];
  match deposit_amt with
  | Some amt =>
    new_amt = builtin add amt amount;
    deposit_amt_deleg[deleg][ssnaddr] := new_amt;
    ssn_deleg_amt[ssnaddr][deleg] := new_amt
  | None =>
    deposit_amt_deleg[deleg][ssnaddr] := amount;
    ssn_deleg_amt[ssnaddr][deleg] := amount
  end
end

procedure AssertNoRewards(ssnaddr: ByStr20, deleg: ByStr20, total_rewards: Uint128)
  no_total_rewards = builtin eq total_rewards uint128_zero;
  match no_total_rewards with
  | True =>
  | False =>
    lrcd_tmp <- last_withdraw_cycle_deleg[deleg][ssnaddr];
    lrcd = option_uint32_value lrcd_tmp;
    lrc <- lastrewardcycle;
    has_reward = builtin lt lrcd lrc;
    match has_reward with
    | True =>
      offset = builtin sub lrc lrcd;
      offset_only_one = builtin eq offset uint32_one;
      match offset_only_one with
      | True =>
        
        
        last_reward_cycle = builtin sub lrc uint32_one;
        last2_reward_cycle = sub_one_to_zero last_reward_cycle;
        cur_opt <- direct_deposit_deleg[deleg][ssnaddr][last_reward_cycle];
        buf_opt <- buff_deposit_deleg[deleg][ssnaddr][last2_reward_cycle];
        comb_opt = option_add cur_opt buf_opt;
        last_amt_o <- deleg_stake_per_cycle[deleg][ssnaddr][last_reward_cycle];
        last_amt = option_uint128_value last_amt_o;
        staking_of_deleg = match comb_opt with
        | Some stake => builtin add last_amt stake
        | None => last_amt
        end;
        no_rewards = builtin eq staking_of_deleg uint128_zero;
        match no_rewards with
        | True =>
        | False =>
          e = DelegHasUnwithdrawRewards;
          ThrowError e
        end
      | False =>
        e = DelegHasUnwithdrawRewards;
        ThrowError e
      end
    | False =>
    end
  end
end

procedure AsseertNoBufferedDeposit(ssnaddr: ByStr20, deleg: ByStr20)
  ldcd_o <- last_buf_deposit_cycle_deleg[deleg][ssnaddr];
  ldcd = option_uint32_value ldcd_o;
  lrc <- lastrewardcycle;
  
  has_buffered = uint32_le lrc ldcd;
  match has_buffered with
  | True =>
    e = DelegHasBufferedDeposit;
    ThrowError e
  | False =>
  end
end


procedure AssertNoBufferedDepositLessOneCycle(ssnaddr: ByStr20, deleg: ByStr20)
  lrc <- lastrewardcycle;
  last_reward_cycle = builtin sub lrc uint32_one;
  has_buffered <- buff_deposit_deleg[deleg][ssnaddr][last_reward_cycle];
  match has_buffered with
  | Some buff_deposit =>
    e = DelegHasBufferedDeposit;
    ThrowError e
  | None =>
  end
end

procedure IsDelegstakeSufficient(amount: Uint128)
  mindelegstake_l <- mindelegstake;
  suffi =  uint128_le mindelegstake_l amount;
  match suffi with
  | True =>
  | False =>
    e = DelegStakeNotEnough;
    ThrowError e
  end
end

procedure AdjustDeleg(ssnaddr: ByStr20, deleg: ByStr20, total_amount: Uint128, withdraw_amount: Uint128)
  sufficient = uint128_le withdraw_amount total_amount;
  match sufficient with
  | True =>
    need_truncate =  builtin eq withdraw_amount total_amount;
    match need_truncate with
    | True =>
      
      TruncateDeleg deleg ssnaddr
    | False =>
      
      lrc <- lastrewardcycle;
      rest_deleg = builtin sub total_amount withdraw_amount;
      
      IsDelegstakeSufficient rest_deleg;
      TruncateDeleg deleg ssnaddr;
      
      
      deposit_amt_deleg[deleg][ssnaddr] := rest_deleg;
      ssn_deleg_amt[ssnaddr][deleg] := rest_deleg;
      direct_deposit_deleg[deleg][ssnaddr][lrc] := rest_deleg;
      last_withdraw_cycle_deleg[deleg][ssnaddr] := lrc
    end
  | False =>
    e = DelegHasNoSufficientAmt;
    ThrowError e
  end
end

procedure UnDelegateStakeAmt(initiator: ByStr20, ssn: ByStr20, undeleg_amt: Uint128)
  ssn_o <- ssnlist[ssn];
  deleg <- deposit_amt_deleg[initiator][ssn];
  match ssn_o with
  | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    match deleg with
    | Some amt =>
      AssertNoRewards ssn initiator rewards;
      AsseertNoBufferedDeposit ssn initiator;
      AdjustDeleg ssn initiator amt undeleg_amt;
      
      new_amt = builtin sub stake_amt undeleg_amt;
      minstake_tmp <- minstake;
      status = uint128_le minstake_tmp new_amt;
      ssn_option_tmp = Ssn status new_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr;
      ssnlist[ssn] := ssn_option_tmp;
      e = { _eventname: "Remove delegate from SSN"; ssn_addr: ssn; deleg_address: initiator; amt: undeleg_amt };
      event e;
      match active_status with
      | True =>
        
        DecreaseTotalStakeAmt undeleg_amt;
        event_decrease = { _eventname: "DecreaseTotalStakeAmt"; decreased_amt: undeleg_amt };
        event event_decrease;
        
        DecreaseTotalStakeAmtOnStatus new_amt status
      | False =>
        event_decrease = { _eventname: "SSNInactiveBefore" };
        event event_decrease
      end
    | None =>
      e = DelegDoesNotExistAtSSN;
      ThrowError e
    end
  | None =>
    e = SSNNotExist;
    ThrowError e
  end
end

procedure WithdrawalStakeAmt(initiator: ByStr20, ssn: ByStr20, withdraw_amount: Uint128)
  ssn_o <- ssnlist[ssn];
  deleg <- deposit_amt_deleg[initiator][ssn];
  match ssn_o with
  | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    match deleg with
    | Some amt =>
      AssertNoRewards ssn initiator rewards;
      AsseertNoBufferedDeposit ssn initiator;
      AdjustDeleg ssn initiator amt withdraw_amount;
      
      new_amt = builtin sub stake_amt withdraw_amount;
      minstake_tmp <- minstake;
      status = uint128_le minstake_tmp new_amt;
      ssn_option_tmp = Ssn status new_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr;
      ssnlist[ssn] := ssn_option_tmp;
      withdrawal_bnum <- & BLOCKNUMBER;
      withdraw_amt_o <- withdrawal_pending[initiator][withdrawal_bnum];
      withdraw_amt_pending = match withdraw_amt_o with
      | Some v => builtin add v withdraw_amount
      | None => withdraw_amount
      end;
      withdrawal_pending[initiator][withdrawal_bnum] := withdraw_amt_pending;
      e = { _eventname: "Deleg withdraw deposit"; ssn_addr: ssn; deleg_address: initiator; withdraw_amount: withdraw_amount };
      event e;
      match active_status with
      | True =>
        
        DecreaseTotalStakeAmt withdraw_amount;
        event_decrease = { _eventname: "DecreaseTotalStakeAmt"; decreased_amt: withdraw_amount };
        event event_decrease;
        
        DecreaseTotalStakeAmtOnStatus new_amt status
      | False =>
        event_decrease = { _eventname: "SSNInactiveBefore" };
        event event_decrease
      end
    | None =>
      e = DelegDoesNotExistAtSSN;
      ThrowError e
    end
  | None =>
    e = SSNNotExist;
    ThrowError e
  end
end

procedure IncreaseReward(reward: Uint128)
  exist_reward <- cycle_rewards_deleg;
  new_reward = builtin add exist_reward reward;
  cycle_rewards_deleg := new_reward
end

procedure CalcStakeRewards(tmp_arg: TmpArg)
  match tmp_arg with
  | TmpArg deleg ssn_operator reward_cycle =>
    last_reward_cycle = builtin sub reward_cycle uint32_one;
    last2_reward_cycle = sub_one_to_zero last_reward_cycle;
    cur_opt <- direct_deposit_deleg[deleg][ssn_operator][last_reward_cycle];
    buf_opt <- buff_deposit_deleg[deleg][ssn_operator][last2_reward_cycle];
    comb_opt = option_add cur_opt buf_opt;

    last_amt_o <- deleg_stake_per_cycle[deleg][ssn_operator][last_reward_cycle];
    last_amt = option_uint128_value last_amt_o;
    staking_and_rewards_per_cycle_for_ssn_opt <- stake_ssn_per_cycle[ssn_operator][reward_cycle];
    
    delete deleg_stake_per_cycle[deleg][ssn_operator][last_reward_cycle];
    delete direct_deposit_deleg[deleg][ssn_operator][last_reward_cycle];
    delete buff_deposit_deleg[deleg][ssn_operator][last2_reward_cycle];

    staking_of_deleg = match comb_opt with
    | Some stake => builtin add last_amt stake
    | None => last_amt
    end;
    deleg_stake_per_cycle[deleg][ssn_operator][reward_cycle] := staking_of_deleg;
    
    
    match staking_and_rewards_per_cycle_for_ssn_opt with
    | Some (SSNCycleInfo total_staking total_rewards) =>
      reward = muldiv total_rewards staking_of_deleg total_staking;
      IncreaseReward reward
    | None =>
    end

  end
end

procedure MintCall(recipient: ByStr20, amount: Uint128)
  is_zero = builtin eq amount uint128_zero;
  match is_zero with
  | True =>
  | False =>
    addr <- gziladdr;
    msg_to_gzil = {_tag: "Mint"; _recipient: addr; _amount: uint128_zero; 
                  recipient: recipient; amount: amount};
    msgs = one_msg msg_to_gzil;
    send msgs
  end
 
end

procedure WithdrawalStakeRewards(deleg: ByStr20, ssn_operator: ByStr20)
  last_withdraw_cycle_deleg_m <- last_withdraw_cycle_deleg[deleg][ssn_operator];
  last_withdraw_cycle = option_uint32_value last_withdraw_cycle_deleg_m;
  lrc <- lastrewardcycle;

  m = builtin add last_withdraw_cycle uint32_one;
  n = builtin add lrc uint32_one;
  list_need_compute_rewards = iota m n;
  
  
  mapper = @list_map Uint32 TmpArg;
  f = fun (cycle: Uint32) => TmpArg deleg ssn_operator cycle;
  combined_args_list = mapper f list_need_compute_rewards;

  
  cycle_rewards_deleg := uint128_zero;
  forall combined_args_list CalcStakeRewards;

  
  reward <- cycle_rewards_deleg;
  SendDelegRewards deleg reward;
  MintCall deleg reward;

  ssn_o <- ssnlist[ssn_operator];
  match ssn_o with
  | Some (Ssn active_status stake_amt total_rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    rest_rewards = builtin sub total_rewards reward;
    ssn = Ssn active_status stake_amt rest_rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr;
    ssnlist[ssn_operator] := ssn
  | None => throw
  end;
  e = { _eventname: "WithdrawalStakeRewards"; rewards: reward};
  event e;
  last_withdraw_cycle_deleg[deleg][ssn_operator] := lrc;
  msg_to_delegator = {_tag : "WithdrawStakeRewardsSuccessCallBack"; _recipient : deleg; _amount : uint128_zero; 
  ssnaddr : ssn_operator; rewards : reward};
  msg = one_msg msg_to_delegator;
  send msg
end

procedure Delegate(ssnaddr: ByStr20, initiator: ByStr20, amount: Uint128)
  curval <- ssnlist[ssnaddr];
  match curval with
  | None =>
    e = SSNNotExist;
    ThrowError e
  | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    IsDelegstakeSufficient amount;
    lrc <- lastrewardcycle;
     
    FillInDepositDelegAmt ssnaddr initiator amount;
    
    
    FillLastWithdrawCycle ssnaddr initiator;
    
    match active_status with
    | True  =>
      last_buf_deposit_cycle_deleg[initiator][ssnaddr] := lrc;
      new_buff_amt  = builtin add amount buffdeposit;
      
      ssn = Ssn bool_active stake_amt rewards name urlraw urlapi new_buff_amt comm comm_rewards rec_addr;
      ssnlist[ssnaddr] := ssn;
      
      stake_amt_for_deleg_option  <- buff_deposit_deleg[initiator][ssnaddr][lrc];
      match stake_amt_for_deleg_option  with
      | Some stake_amt_for_deleg =>
        new_stake_amt_for_deleg = builtin add stake_amt_for_deleg amount;
        buff_deposit_deleg[initiator][ssnaddr][lrc] := new_stake_amt_for_deleg
      | None =>
        buff_deposit_deleg[initiator][ssnaddr][lrc] := amount
      end
    | False =>
      minstake_tmp <- minstake;
      
      new_stake_amt  = builtin add amount stake_amt;
      status = uint128_le minstake_tmp new_stake_amt;
      
      ssn = Ssn status new_stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr;
      ssnlist[ssnaddr] := ssn;
      
      IncreaseTotalStakeAmtOnStatus new_stake_amt status;
      
      stake_amt_for_deleg_option  <- direct_deposit_deleg[initiator][ssnaddr][lrc];
      match stake_amt_for_deleg_option  with
      | Some stake_amt_for_deleg =>
        new_stake_amt_for_deleg = builtin add stake_amt_for_deleg amount;
        direct_deposit_deleg[initiator][ssnaddr][lrc] := new_stake_amt_for_deleg
      | None =>
        direct_deposit_deleg[initiator][ssnaddr][lrc] := amount
      end
    end
  end  
end











transition Pause(initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  paused := bool_active
end



transition UnPause(initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  paused := bool_inactive
end




transition UpdateAdmin(admin: ByStr20, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  staging_admin = Some {ByStr20} admin;
  stagingcontractadmin := staging_admin
end



transition ClaimAdmin(initiator: ByStr20)
  IsProxy;
  staging_admin <- stagingcontractadmin;
  match staging_admin with
  | Some admin =>
    is_valid = builtin eq initiator admin;
    match is_valid with
    | True =>
      contractadmin := admin;
      staging_admin = None {ByStr20};
      stagingcontractadmin := staging_admin;
      e = { _eventname: "ClaimAdmin"; new_admin: admin };
      event e
    | False =>
      e = StagingAdminValidationFailed;
      ThrowError e
    end
  | None =>
    e = StagingAdminNotExist;
    ThrowError e
  end
end




transition UpdateVerifier(verif: ByStr20, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  newverifier = Some {ByStr20} verif;
  verifier := newverifier
end




transition UpdateVerifierRewardAddr(addr: ByStr20, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  newAddr = Some {ByStr20} addr;
  verifier_receiving_addr := newAddr
end





transition UpdateStakingParameters(min_stake: Uint128, min_deleg_stake: Uint128, max_comm_change_rate: Uint128, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  minstake := min_stake;
  mindelegstake := min_deleg_stake;
  maxcommchangerate := max_comm_change_rate
end

transition ChangeBNumReq(input_bnum_req: Uint128, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  bnum_req := input_bnum_req
end

transition UpdateGzilAddr(gzil_addr: ByStr20, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  gziladdr := gzil_addr
end

transition AddSSN(ssnaddr: ByStr20, name: String, urlraw: String, urlapi: String, comm: Uint128, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  already_exists <- exists ssnlist[ssnaddr];
  match already_exists with
  | True  =>
    e = SSNAlreadyExist;
    ThrowError e
  | False =>
    ValidateRate comm;
    status = bool_inactive;
    stake_amt = Uint128 0;
    rewards = Uint128 0;
    buff_deposit = Uint128 0;
    comm_rewards = Uint128 0;
    s = Ssn status stake_amt rewards name urlraw urlapi buff_deposit comm comm_rewards ssnaddr;
    ssnlist[ssnaddr] := s;
    lrc <- lastrewardcycle;
    comm_for_ssn[ssnaddr][lrc] := comm;
    e = { _eventname: "SSN added"; ssn_addr: ssnaddr };
    event e
  end
end

transition UpdateSSN(ssnaddr: ByStr20, new_name: String, new_urlraw: String, new_urlapi: String, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  ssn_o <- ssnlist[ssnaddr];
  match ssn_o with
  | Some (Ssn active_status staking_amt deleg_reward name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    ssn = Ssn active_status staking_amt deleg_reward new_name new_urlraw new_urlapi buffdeposit comm comm_rewards rec_addr;
    ssnlist[ssnaddr] := ssn;
    e = { _eventname: "UpdateSSN"; ssnaddr: ssnaddr; new_name: new_name; new_urlraw: new_urlraw; new_urlapi: new_urlapi; initiator: initiator };
    event e
  | None =>
    e = SSNNotExist;
    ThrowError e
  end
end










transition UpdateComm(new_rate: Uint128, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  curval <- ssnlist[initiator];
  match curval with
  | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    lrc <- lastrewardcycle;
    old_comm_option <- comm_for_ssn[initiator][lrc];
    match old_comm_option with
    | Some old_comm =>
      e = ChangeCommError;
      ThrowError e
    | None =>
      ValidateRate new_rate;
      ValidateChangeRate comm new_rate;
      comm_for_ssn[initiator][lrc] := new_rate;
      ssn =  Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit new_rate comm_rewards rec_addr;
      ssnlist[initiator] := ssn;
      e = { _eventname: "UpdateComm"; ssn_addr: initiator; new_rate: new_rate };
      event e
    end
  | None =>
    e = SSNNotExist;
    ThrowError e
  end
end



transition WithdrawComm(initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  curval <- ssnlist[initiator];
  match curval with
  | None =>
    e = SSNNotExist;
    ThrowError e
  | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    has_comm = uint128_gt comm_rewards uint128_zero;
    match has_comm with
    | True =>
      e = { _eventname: "SSN withdraw reward"; ssn_addr: initiator; withdraw_comm: comm_rewards };
      event e;
      ssn = Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm uint128_zero rec_addr;
      ssnlist[initiator] := ssn;
      TransferFunds addfunds_tag comm_rewards rec_addr
    | False =>
      e = SSNNoComm;
      ThrowError e
    end
  end
end




transition UpdateReceivingAddr(new_addr: ByStr20, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  curval <- ssnlist[initiator];
  match curval with
  | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    ssn =  Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards new_addr;
    ssnlist[initiator] := ssn;
    e = { _eventname: "UpdateReceivingAddr"; ssn_addr: initiator; new_addr: new_addr };
    event e
  | None =>
    e = SSNNotExist;
    ThrowError e
  end
end








transition DelegateStake(ssnaddr: ByStr20, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  
  accept; 
  amount = _amount;
  Delegate ssnaddr initiator amount;
  e = { _eventname: "DelegateStake"; ssn_addr: ssnaddr; delegator: initiator; amount: amount };
  event e;
  msg_to_delegator = {_tag : "DelegateStakeSuccessCallBack"; _recipient : initiator; _amount : uint128_zero; 
  ssnaddr : ssnaddr; amount : amount};
  msg = one_msg msg_to_delegator;
  send msg
end




transition WithdrawStakeRewards(ssnaddr: ByStr20, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  DelegExists ssnaddr initiator;
  WithdrawalStakeRewards initiator ssnaddr
end





transition WithdrawStakeAmt(ssnaddr: ByStr20, amt: Uint128, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  WithdrawalStakeAmt initiator ssnaddr amt;
  msg_to_delegator = {_tag : "WithdrawStakeAmtSuccessCallBack"; _recipient : initiator; _amount : uint128_zero; 
  ssnaddr : ssnaddr; amount : amt};
  msg = one_msg msg_to_delegator;
  send msg
end



transition CompleteWithdrawal(initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  withdraw_map_o <- withdrawal_pending[initiator];
  match withdraw_map_o with
  | Some withdraw_map =>
    withdraw_list = builtin to_list withdraw_map;
    
    withdrawal_zero = uint128_zero;
    available_withdrawal := withdrawal_zero;
    c = Some {ByStr20} initiator;
    current_deleg := c;

    
    forall withdraw_list CalculateTotalWithdrawal;
    withdraw_amt <- available_withdrawal;
    transfer = builtin eq withdraw_amt uint128_zero;
    match transfer with
    | True =>
      e = { _eventname: "NoUnbondedStake"; ssnaddr: initiator };
      event e;
      msg_to_delegator = {_tag : "CompleteWithdrawalNoUnbondedStakeCallBack"; _recipient : initiator; _amount : uint128_zero; 
      amount : uint128_zero};
      msg = one_msg msg_to_delegator;
      send msg
    | False =>
      e = { _eventname: "CompleteWithdrawal"; ssnaddr: initiator; amount: withdraw_amt };
      event e;
      TransferFunds addfunds_tag withdraw_amt initiator;
      msg_to_delegator = {_tag : "CompleteWithdrawalSuccessCallBack"; _recipient : initiator; _amount : uint128_zero; 
      amount : withdraw_amt};
      msg = one_msg msg_to_delegator;
      send msg
    end
  | None =>
    e = { _eventname: "NoPendingWithdrawal"; ssnaddr: initiator };
    event e
  end
end






transition ReDelegateStake(ssnaddr: ByStr20, to_ssn: ByStr20, amount: Uint128, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  same_ssn = builtin eq ssnaddr to_ssn;
  match same_ssn with
  | True =>
    e = ReDelegInvalidSSNAddr;
    ThrowError e
  | False =>
    UnDelegateStakeAmt initiator ssnaddr amount;
    Delegate to_ssn initiator amount;
    e = { _eventname: "ReDelegateStakeSuccess"; ssnaddr: ssnaddr; to_ssn: to_ssn; delegator: initiator; delegate_amount: amount };
    event e;
    msg_to_delegator = {_tag : "ReDelegateStakeSuccessCallBack"; _recipient : initiator; _amount : uint128_zero; 
    ssnaddr: ssnaddr; tossn: to_ssn; amount : amount};
    msg = one_msg msg_to_delegator;
    send msg
  end
  
end













transition AssignStakeReward(ssnreward_list: List (Pair ByStr20 Uint128), initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  CallerIsVerifier initiator;
  lrc <- lastrewardcycle;
  accept;
  newLastRewardCycleNum = builtin add uint32_one lrc;
  lastrewardcycle := newLastRewardCycleNum;
  
  verifier_reward := _amount;
  
  total_stake_amt <- totalstakeamount;
  f = map_to_stake_rewards total_stake_amt;

  mapper = @list_map (Pair ByStr20 Uint128) SsnStakeRewardShare;
  ssn_stake_reward_list = mapper f ssnreward_list;
  forall ssn_stake_reward_list UpdateStakeReward;
  verifier_reward_amt <- verifier_reward;
  verifier_o <- verifier_receiving_addr;
  match verifier_o with
  | Some v => 
    is_zero = builtin eq verifier_reward_amt uint128_zero;
    match is_zero with
    | True =>
    | False =>
      TransferFunds addfunds_tag verifier_reward_amt v
    end
  | None =>
    e = VerifierRecvAddrNotSet;
    ThrowError e
  end

end







transition AddFunds(initiator: ByStr20)
  IsProxy;
  accept;
  e = { _eventname : "Funds deposit "; funder : initiator };
  event e
end


















transition AddSSNAfterUpgrade(ssnaddr: ByStr20, stake_amt: Uint128, rewards: Uint128, name: String, urlraw: String, urlapi: String, buff_deposit: Uint128,  comm: Uint128, comm_rewards: Uint128, rec_addr: ByStr20, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  already_exists <- exists ssnlist[ssnaddr];
  match already_exists with
  | True  =>
    e = { _eventname: "SSN already exists"; ssn_addr: ssnaddr };
    event e
  | False =>
    minstake_tmp <- minstake;
    status = uint128_le minstake_tmp stake_amt;
    s = Ssn status stake_amt rewards name urlraw urlapi buff_deposit comm comm_rewards rec_addr;
    ssnlist[ssnaddr] := s;
    e = { _eventname: "SSN added"; ssn_addr: ssnaddr };
    event e
  end
end








transition UpdateDeleg(ssnaddr: ByStr20, deleg: ByStr20, stake_amt: Uint128, initiator: ByStr20)
  IsProxy;
  IsAdmin initiator;
  ssn_o <- ssnlist[ssnaddr];
  minstake_tmp <- minstake;
  match ssn_o with
  | Some (Ssn active_status staking_amt deleg_reward name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    is_delete = builtin eq stake_amt uint128_zero;
    match is_delete with
    | True =>
      alr_deleg_amt_o <- deposit_amt_deleg[deleg][ssnaddr];
      match alr_deleg_amt_o with
      | Some alr_deleg =>
        TruncateDeleg deleg ssnaddr;
        new_stake_amt = builtin sub staking_amt alr_deleg;
        status = uint128_le minstake_tmp new_stake_amt;
        ssn = Ssn status new_stake_amt deleg_reward name urlraw urlapi buffdeposit comm comm_rewards rec_addr;
        ssnlist[ssnaddr] := ssn;
        e = { _eventname: "Deleg deleted"; ssn_addr: ssnaddr; deleg_address: deleg };
        event e;
        TransferFunds addfunds_tag alr_deleg deleg 
      | None =>
      end
    | False =>
      FillInDepositDelegAmt ssnaddr deleg stake_amt;
      new_stake_amt = builtin add stake_amt staking_amt;
      status = uint128_le minstake_tmp new_stake_amt;
      ssn = Ssn status new_stake_amt deleg_reward name urlraw urlapi buffdeposit comm comm_rewards rec_addr;
      ssnlist[ssnaddr] := ssn;
      e = { _eventname: "Deleg added"; ssn_addr: ssnaddr; deleg_address: deleg };
      event e
    end
  | None =>
    e = SSNNotExist;
    ThrowError e
  end
end

transition PopulateStakeSSNPerCycle(ssn_addr: ByStr20, cycle: Uint32, totalAmt: Uint128, rewards: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  info = SSNCycleInfo totalAmt rewards;
  stake_ssn_per_cycle[ssn_addr][cycle] := info
end

transition PopulateLastWithdrawCycleForDeleg(deleg_addr: ByStr20, ssn_addr: ByStr20, cycle: Uint32, initiator: ByStr20)
  IsPaused;  
  IsProxy;
  IsAdmin initiator;
  last_withdraw_cycle_deleg[deleg_addr][ssn_addr] := cycle
end

transition PopulateLastBufDepositCycleDeleg(deleg_addr: ByStr20, ssn_addr: ByStr20, cycle: Uint32, initiator: ByStr20)
  IsPaused;  
  IsProxy;
  IsAdmin initiator;
  last_buf_deposit_cycle_deleg[deleg_addr][ssn_addr] := cycle
end

transition PopulateBuffDeposit(deleg_addr: ByStr20, ssn_addr: ByStr20, cycle: Uint32, amt: Uint128, initiator: ByStr20)
  IsPaused;  
  IsProxy;
  IsAdmin initiator;
  buff_deposit_deleg[deleg_addr][ssn_addr][cycle] := amt
end

transition PopulateDirectDeposit(deleg_addr: ByStr20, ssn_addr: ByStr20, cycle: Uint32, amt: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  direct_deposit_deleg[deleg_addr][ssn_addr][cycle] := amt
end

transition PopulateDepositAmtDeleg(deleg_addr: ByStr20, ssn_addr: ByStr20, amt: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  deposit_amt_deleg[deleg_addr][ssn_addr] := amt;
  ssn_deleg_amt[ssn_addr][deleg_addr] := amt
end


transition PopulateDelegStakePerCycle(deleg_addr: ByStr20, ssn_addr: ByStr20, cycle: Uint32, amt: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  deleg_stake_per_cycle[deleg_addr][ssn_addr][cycle] := amt
end

transition PopulateLastRewardCycle(cycle: Uint32, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  lastrewardcycle := cycle
end

transition PopulateCommForSSN(ssn_addr: ByStr20, cycle: Uint32, comm: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  comm_for_ssn[ssn_addr][cycle] := comm
end

transition PopulateTotalStakeAmt(amt: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  totalstakeamount := amt
end

transition PopulatePendingWithdrawal(ssn_addr: ByStr20, block_number: BNum, stake: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  withdrawal_pending[ssn_addr][block_number] := stake
end

transition PopulateDelegSwapRequest(requestor: ByStr20, new_deleg_addr: ByStr20, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  deleg_swap_request[requestor] := new_deleg_addr
end





transition DrainContractBalance(amt: Uint128, initiator: ByStr20)
  IsPaused;
  IsProxy;
  IsAdmin initiator;
  bal <- _balance;
  less_than = builtin lt bal amt;
  match less_than with
  | True => throw
  | False =>
    TransferFunds addfunds_tag amt initiator
  end
end





procedure ActualSwapDirectDeposit(direct_deposit_cycle: Pair Uint32 Uint128)
  current_ssn_o <- current_ssn;
  current_deleg_o <- current_deleg;
  new_deleg_o <- new_deleg;

  fst = @fst Uint32 Uint128;
  snd = @snd Uint32 Uint128;
  reward_cycle = fst direct_deposit_cycle;
  current_direct_deposit_amt = snd direct_deposit_cycle;

  match new_deleg_o with
  | Some new_deleg_addr =>
    match current_deleg_o with
    | Some initial_deleg =>
      match current_ssn_o with
      | Some ssn =>
        
        new_deleg_direct_deposit_amt <- direct_deposit_deleg[new_deleg_addr][ssn][reward_cycle];
        match new_deleg_direct_deposit_amt with
        | Some new_deleg_direct_deposit =>
          new_amt = builtin add new_deleg_direct_deposit current_direct_deposit_amt;
          direct_deposit_deleg[new_deleg_addr][ssn][reward_cycle] := new_amt;
          e = { _eventname: "SwapDirectDepositExists"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn; existing_amt: current_direct_deposit_amt; transferred_amt: new_deleg_direct_deposit; new_amt: new_amt };
          event e
        | None =>
          
          
          direct_deposit_deleg[new_deleg_addr][ssn][reward_cycle] := current_direct_deposit_amt;
          e = { _eventname: "SwapDirectDepositNewEntry"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn; amt: current_direct_deposit_amt };
          event e
        end
      | None =>
        
      end
    | None =>
      
    end
  | None =>
    
  end
end



procedure SwapDirectDeposit(ssninfo: Pair ByStr20 Ssn)
  fst = @fst ByStr20 Ssn;
  ssn_address = fst ssninfo;
  current_deleg_o <- current_deleg;

  match current_deleg_o with
  | Some deleg =>
    direct_deposit_cycle_map <- direct_deposit_deleg[deleg][ssn_address];
    match direct_deposit_cycle_map with
    | Some direct_deposit_cycle_map_o =>
      direct_deposit_list = builtin to_list direct_deposit_cycle_map_o;
      ssn = Some {ByStr20} ssn_address;
      current_ssn := ssn;
      forall direct_deposit_list ActualSwapDirectDeposit;
      
      delete direct_deposit_deleg[deleg][ssn_address]
    | None => 
    end
  | None => 
  end
end

procedure ActualSwapDelegStakePerCycle(deleg_stake_cycle: Pair Uint32 Uint128)
  current_ssn_o <- current_ssn;
  current_deleg_o <- current_deleg;
  new_deleg_o <- new_deleg;

  fst = @fst Uint32 Uint128;
  snd = @snd Uint32 Uint128;
  cycle_no = fst deleg_stake_cycle;
  current_deposit_amt = snd deleg_stake_cycle;

  match new_deleg_o with
  | Some new_deleg_addr =>
    match current_deleg_o with
    | Some initial_deleg =>
      match current_ssn_o with
      | Some ssn =>
        
        deleg_stake_deposit <- deleg_stake_per_cycle[new_deleg_addr][ssn][cycle_no];
        match deleg_stake_deposit with
        | Some stake_deposit =>
          new_amt = builtin add stake_deposit current_deposit_amt;
          deleg_stake_per_cycle[new_deleg_addr][ssn][cycle_no] := new_amt;
          e = { _eventname: "SwapDelegStakePerCycleExists"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn; existing_amt: current_deposit_amt; transferred_amt: stake_deposit; new_amt: new_amt };
          event e
        | None =>
          
          
          deleg_stake_per_cycle[new_deleg_addr][ssn][cycle_no] := current_deposit_amt;
          e = { _eventname: "SwapDelegStakePerCycleNewEntry"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn; amt: current_deposit_amt };
          event e
        end
      | None =>
        
      end
    | None =>
      
    end
  | None =>
    
  end
end



procedure SwapDelegStakePerCycle(ssninfo: Pair ByStr20 Ssn)
  fst = @fst ByStr20 Ssn;
  ssn_address = fst ssninfo;
  current_deleg_o <- current_deleg;

  match current_deleg_o with
  | Some deleg =>
    deleg_stake_per_cycle_map <- deleg_stake_per_cycle[deleg][ssn_address];
    match deleg_stake_per_cycle_map with
    | Some deleg_stake_per_cycle_map_o =>
      deleg_stake_per_cycle_list = builtin to_list deleg_stake_per_cycle_map_o;
      ssn = Some {ByStr20} ssn_address;
      current_ssn := ssn;
      forall deleg_stake_per_cycle_list ActualSwapDelegStakePerCycle;
      
      delete deleg_stake_per_cycle[deleg][ssn_address]
    | None => 
    end
  | None => 
  end
end


procedure SwapDepositAmtDeleg(ssninfo: Pair ByStr20 Ssn)
  fst = @fst ByStr20 Ssn;
  ssn_address = fst ssninfo;
  current_deleg_o <- current_deleg;
  new_deleg_o <- new_deleg;

  match current_deleg_o with
  | Some initial_deleg =>
    deposit_deleg_amt <- deposit_amt_deleg[initial_deleg][ssn_address];
    match deposit_deleg_amt with
    | Some deposit_amt =>
      match new_deleg_o with
      | Some new_deleg_addr =>
        current_deposit_deleg_amt <- deposit_amt_deleg[new_deleg_addr][ssn_address];
        match current_deposit_deleg_amt with
        | Some existing_deposit_amt =>
          
          new_amt = builtin add existing_deposit_amt deposit_amt;
          deposit_amt_deleg[new_deleg_addr][ssn_address] := new_amt;
          delete deposit_amt_deleg[initial_deleg][ssn_address];
          e = { _eventname: "SwapDepositAmtDelegExists"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; existing_amt: existing_deposit_amt; transferred_amt: deposit_amt; new_amt: new_amt };
          event e
        | None =>
          
          
          deposit_amt_deleg[new_deleg_addr][ssn_address] := deposit_amt;
          delete deposit_amt_deleg[initial_deleg][ssn_address];
          e = { _eventname: "SwapDepositAmtDelegNewEntry"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; amt: deposit_amt };
          event e
        end
      | None => 
      end
    | None => 
    end
  | None => 
  end
end


procedure SwapSSNDelegAmt(ssninfo: Pair ByStr20 Ssn)
  fst = @fst ByStr20 Ssn;
  ssn_address = fst ssninfo;
  current_deleg_o <- current_deleg;
  new_deleg_o <- new_deleg;

  match current_deleg_o with
  | Some initial_deleg =>
    ssn_deleg_deposit <- ssn_deleg_amt[ssn_address][initial_deleg];
    match ssn_deleg_deposit with
    | Some ssn_deleg_deposit_amt =>
      match new_deleg_o with
      | Some new_deleg_addr =>
        new_ssn_deleg_amt <- ssn_deleg_amt[ssn_address][new_deleg_addr];
        match new_ssn_deleg_amt with
        | Some existing_deleg_amt =>
          new_amt = builtin add existing_deleg_amt ssn_deleg_deposit_amt;
          ssn_deleg_amt[ssn_address][new_deleg_addr] := new_amt;
          delete ssn_deleg_amt[ssn_address][initial_deleg];
          e = { _eventname: "SwapSSNDelegAmtExists"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; existing_amt: existing_deleg_amt; transferred_amt: ssn_deleg_deposit_amt; new_amt: new_amt };
          event e
        | None =>
          
          
          ssn_deleg_amt[ssn_address][new_deleg_addr] := ssn_deleg_deposit_amt;
          delete ssn_deleg_amt[ssn_address][initial_deleg];
          e = { _eventname: "SwapSSNDelegAmtNewEntry"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; amt: ssn_deleg_deposit_amt };
          event e
        end
      | None => 
      end
    | None => 
    end
  | None => 
  end
end




procedure SwapLastWithdrawCycleDeleg(ssninfo: Pair ByStr20 Ssn)
  fst = @fst ByStr20 Ssn;
  ssn_address = fst ssninfo;
  current_deleg_o <- current_deleg;
  new_deleg_o <- new_deleg;

  match current_deleg_o with
  | Some initial_deleg =>
    lwcd <- last_withdraw_cycle_deleg[initial_deleg][ssn_address];
    match lwcd with
    | Some requestor_lwcd =>
      match new_deleg_o with
      | Some new_deleg_addr =>
        new_deleg_lwcd <- last_withdraw_cycle_deleg[new_deleg_addr][ssn_address];
        match new_deleg_lwcd with
        | Some existing_lwcd =>
          
          
          
          delete last_withdraw_cycle_deleg[initial_deleg][ssn_address];
          e = { _eventname: "SwapLastWithdrawCycleDelegExists"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; existing_lwcd: existing_lwcd };
          event e
        | None =>
          
          last_withdraw_cycle_deleg[new_deleg_addr][ssn_address] := requestor_lwcd;
          delete last_withdraw_cycle_deleg[initial_deleg][ssn_address];
          e = { _eventname: "SwapLastWithdrawCycleDelegNewEntry"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; lwcd: requestor_lwcd };
          event e
        end
      | None => 
      end
    | None => 
    end
  | None => 
  end
end




procedure SwapLastBuffDepositCycleDeleg(ssninfo: Pair ByStr20 Ssn)
  fst = @fst ByStr20 Ssn;
  ssn_address = fst ssninfo;
  current_deleg_o <- current_deleg;
  new_deleg_o <- new_deleg;

  match current_deleg_o with
  | Some initial_deleg =>
    lbdc <- last_buf_deposit_cycle_deleg[initial_deleg][ssn_address];
    match lbdc with
    | Some requestor_lbdc =>
      match new_deleg_o with
      | Some new_deleg_addr =>
        new_deleg_lbdc <- last_buf_deposit_cycle_deleg[new_deleg_addr][ssn_address];
        match new_deleg_lbdc with
        | Some existing_lbdc =>
          
          
          delete last_buf_deposit_cycle_deleg[initial_deleg][ssn_address];
          e = { _eventname: "SwapLastBuffDepositCycleDelegExists"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; existing_lbdc: existing_lbdc };
          event e
        | None =>
          
          last_buf_deposit_cycle_deleg[new_deleg_addr][ssn_address] := requestor_lbdc;
          delete last_buf_deposit_cycle_deleg[initial_deleg][ssn_address];
          e = { _eventname: "SwapLastBuffDepositCycleDelegNewEntry"; initial_deleg: initial_deleg; new_deleg: new_deleg_addr; ssn_addr: ssn_address; lbdc: requestor_lbdc };
          event e
        end
      | None => 
      end
    | None => 
    end
  | None => 
  end
end


procedure SwapPendingWithdrawal(blk_deposit_cycle: Pair BNum Uint128)
  current_deleg_o <- current_deleg;
  new_deleg_o <- new_deleg;
  fst = @fst BNum Uint128;
  snd = @snd BNum Uint128;
  blk_num = fst blk_deposit_cycle;
  deposit = snd blk_deposit_cycle;
  
  match new_deleg_o with
  | Some new_deleg_addr =>
    new_deleg_pending_withdrawal <- withdrawal_pending[new_deleg_addr][blk_num];
    match new_deleg_pending_withdrawal with
    | Some existing_deposit =>
      
      new_deposit = builtin add existing_deposit deposit;
      withdrawal_pending[new_deleg_addr][blk_num] := new_deposit;
      e = { _eventname: "SwapPendingWithdrawalExists"; initial_deleg: current_deleg_o; new_deleg: new_deleg_addr; existing_deposit: existing_deposit; new_deposit: new_deposit };
      event e
    | None =>
      
      withdrawal_pending[new_deleg_addr][blk_num] := deposit;
      e = { _eventname: "SwapPendingWithdrawalNewEntry"; initial_deleg: current_deleg_o; new_deleg: new_deleg_addr; deposit: deposit };
      event e
    end
  | None => 
  end
end


procedure SwapCleanUp()
  r = Some {ByStr20} reset_addr;
  current_deleg := r;
  current_ssn := r;
  new_deleg := r
end



procedure SwapDelegator(requestor: ByStr20, new_deleg_addr: ByStr20)
  c = Some {ByStr20} requestor;
  current_deleg := c;
  n = Some {ByStr20} new_deleg_addr;
  new_deleg := n;
  ssnlist_o <- ssnlist;
  ssninfo_list = builtin to_list ssnlist_o;

  
  forall ssninfo_list SwapDirectDeposit;
  forall ssninfo_list SwapDelegStakePerCycle;
  forall ssninfo_list SwapDepositAmtDeleg;
  forall ssninfo_list SwapSSNDelegAmt;
  forall ssninfo_list SwapLastBuffDepositCycleDeleg;
  forall ssninfo_list SwapLastWithdrawCycleDeleg;
  
  
  match c with
  | Some initial_deleg =>
    deleg_blk_map <- withdrawal_pending[initial_deleg];
    match deleg_blk_map with
    | Some deleg_blk_entry =>
      cycle_reward_list = builtin to_list deleg_blk_entry;
      forall cycle_reward_list SwapPendingWithdrawal;
      delete withdrawal_pending[initial_deleg]
    | None => 
    end
  | None => 
  end
end






procedure IsNotCyclicSwap(initiator: ByStr20, new_deleg_addr: ByStr20)
 cyclic_initiator <- deleg_swap_request[new_deleg_addr];
 match cyclic_initiator with
 | Some addr =>
   
   is_cyclic_request = builtin eq addr initiator;
   match is_cyclic_request with
   | True =>
     e = SwapAddrAlreadyExistsAsRequest;
     ThrowError e
   | False =>
   end
 | None =>
 end
end


procedure IsNotSelfSwap(initiator: ByStr20, new_deleg_addr: ByStr20)
  is_identical_addr = builtin eq initiator new_deleg_addr;
  match is_identical_addr with
  | True =>
    e = InvalidSwapAddr;
    ThrowError e
  | False =>
  end
end


procedure IsValidSwapAddr(requestor: ByStr20, new_deleg_addr: ByStr20)
  swap_addr <- deleg_swap_request[requestor];
  match swap_addr with
  | Some requestor_swap_addr =>
    is_new_deleg_valid = builtin eq requestor_swap_addr new_deleg_addr;
    match is_new_deleg_valid with
    | True => 
    | False =>
      
      e = SwapAddrValidationFailed;
      ThrowError e
    end
  | None => 
    e = InvalidSwapAddr;
    ThrowError e
  end
end

procedure AssertSwapNoBufferedAndRewards(ssninfo: Pair ByStr20 Ssn)
  current_deleg_o <- current_deleg;
  fst = @fst ByStr20 Ssn;
  ssn_address = fst ssninfo;
  ssn_o <- ssnlist[ssn_address];

  match ssn_o with
  | Some (Ssn active_status stake_amt rewards name urlraw urlapi buffdeposit comm comm_rewards rec_addr) =>
    match current_deleg_o with
    | Some requestor =>
      AssertNoRewards ssn_address requestor rewards;
      AsseertNoBufferedDeposit ssn_address requestor;
      AssertNoBufferedDepositLessOneCycle ssn_address requestor
    | None =>
    end
  | None =>
  end
end


procedure AssertNoBufferedAndRewards(requestor : ByStr20)
  c = Some {ByStr20} requestor;
  current_deleg := c;
  ssnlist_o <- ssnlist;
  ssninfo_list = builtin to_list ssnlist_o;
  forall ssninfo_list AssertSwapNoBufferedAndRewards
end





transition RequestDelegatorSwap(new_deleg_addr: ByStr20, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  IsNotSelfSwap initiator new_deleg_addr;
  IsNotCyclicSwap initiator new_deleg_addr;
  
  AssertNoBufferedAndRewards initiator;
  AssertNoBufferedAndRewards new_deleg_addr;
  deleg_swap_request[initiator] := new_deleg_addr;
  e = { _eventname: "RequestDelegatorSwap"; initial_deleg: initiator; new_deleg: new_deleg_addr };
  event e
end






transition ConfirmDelegatorSwap(requestor: ByStr20, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  IsValidSwapAddr requestor initiator;
  
  AssertNoBufferedAndRewards requestor;
  AssertNoBufferedAndRewards initiator;
  SwapDelegator requestor initiator;
  SwapCleanUp;
  delete deleg_swap_request[requestor];
  e = { _eventname: "ConfirmDelegatorSwap"; initial_deleg: requestor; new_deleg: initiator };
  event e
end




transition RevokeDelegatorSwap(initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  swap_addr <- deleg_swap_request[initiator];
  match swap_addr with
  | Some requestor_swap_addr =>
    delete deleg_swap_request[initiator];
    e = { _eventname: "RevokeDelegatorSwap"; initial_deleg: initiator; new_deleg: requestor_swap_addr };
    event e
  | None =>
    e = InvalidSwapAddr;
    ThrowError e
  end
end






transition RejectDelegatorSwap(requestor: ByStr20, initiator: ByStr20)
  IsNotPaused;
  IsProxy;
  IsValidSwapAddr requestor initiator;
  delete deleg_swap_request[requestor];
  e = { _eventname: "RejectDelegatorSwap"; requestor: requestor; new_deleg: initiator };
  event e
end`;
            const contract = newContract(zil, code, [
                {
                    type: `Uint32`,
                    vname: `_scilla_version`,
                    value: "0",
                },
                {
                    type: `ByStr20`,
                    vname: `init_admin`,
                    value: __init_admin.toSend(),
                },
                {
                    type: `ByStr20`,
                    vname: `init_proxy_address`,
                    value: __init_proxy_address.toSend(),
                },
                {
                    type: `ByStr20`,
                    vname: `init_gzil_address`,
                    value: __init_gzil_address.toSend(),
                },
            ]);
            const [tx, con] = await contract.deploy({
                version: getVersion(),
                gasPrice,
                gasLimit,
            }, 33, 1000);
            txLink(tx, "Deploy");
            if (!con.address) {
                if (con.error) {
                    throw new Error(JSON.stringify(con.error, null, 2));
                }
                throw new Error("Contract failed to deploy");
            }
            return { tx, contract: con, address: new T.ByStr20(con.address) };
        },
        state: (query, includeInit) => ({
            get: (...contractAddresses) => partialState(getZil)(...contractAddresses.map((c) => ({
                contractAddress: c,
                includeInit,
                query,
            }))),
        }),
        /**
         * interface for scilla contract with source code hash:
         * 0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
         */
        calls: (a) => (gasLimit) => {
            const signer = signTransition(a);
            return {
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_Pause: signer("Pause"),
                Pause: (__initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `Pause`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "Pause");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UnPause: signer("UnPause"),
                UnPause: (__initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UnPause`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UnPause");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateAdmin: signer("UpdateAdmin"),
                UpdateAdmin: (__admin, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateAdmin`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `admin`,
                                value: __admin.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateAdmin");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_ClaimAdmin: signer("ClaimAdmin"),
                ClaimAdmin: (__initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `ClaimAdmin`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "ClaimAdmin");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateVerifier: signer("UpdateVerifier"),
                UpdateVerifier: (__verif, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateVerifier`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `verif`,
                                value: __verif.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateVerifier");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateVerifierRewardAddr: signer("UpdateVerifierRewardAddr"),
                UpdateVerifierRewardAddr: (__addr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateVerifierRewardAddr`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `addr`,
                                value: __addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateVerifierRewardAddr");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateStakingParameters: signer("UpdateStakingParameters"),
                UpdateStakingParameters: (__min_stake, __min_deleg_stake, __max_comm_change_rate, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateStakingParameters`,
                        data: [
                            {
                                type: `Uint128`,
                                vname: `min_stake`,
                                value: __min_stake.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `min_deleg_stake`,
                                value: __min_deleg_stake.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `max_comm_change_rate`,
                                value: __max_comm_change_rate.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateStakingParameters");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_ChangeBNumReq: signer("ChangeBNumReq"),
                ChangeBNumReq: (__input_bnum_req, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `ChangeBNumReq`,
                        data: [
                            {
                                type: `Uint128`,
                                vname: `input_bnum_req`,
                                value: __input_bnum_req.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "ChangeBNumReq");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateGzilAddr: signer("UpdateGzilAddr"),
                UpdateGzilAddr: (__gzil_addr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateGzilAddr`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `gzil_addr`,
                                value: __gzil_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateGzilAddr");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_AddSSN: signer("AddSSN"),
                AddSSN: (__ssnaddr, __name, __urlraw, __urlapi, __comm, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `AddSSN`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `name`,
                                value: __name.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `urlraw`,
                                value: __urlraw.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `urlapi`,
                                value: __urlapi.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `comm`,
                                value: __comm.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "AddSSN");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateSSN: signer("UpdateSSN"),
                UpdateSSN: (__ssnaddr, __new_name, __new_urlraw, __new_urlapi, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateSSN`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `new_name`,
                                value: __new_name.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `new_urlraw`,
                                value: __new_urlraw.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `new_urlapi`,
                                value: __new_urlapi.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateSSN");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateComm: signer("UpdateComm"),
                UpdateComm: (__new_rate, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateComm`,
                        data: [
                            {
                                type: `Uint128`,
                                vname: `new_rate`,
                                value: __new_rate.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateComm");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_WithdrawComm: signer("WithdrawComm"),
                WithdrawComm: (__initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `WithdrawComm`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "WithdrawComm");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateReceivingAddr: signer("UpdateReceivingAddr"),
                UpdateReceivingAddr: (__new_addr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateReceivingAddr`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `new_addr`,
                                value: __new_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateReceivingAddr");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_DelegateStake: signer("DelegateStake"),
                DelegateStake: (amount, __ssnaddr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `DelegateStake`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: amount.value.toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "DelegateStake");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_WithdrawStakeRewards: signer("WithdrawStakeRewards"),
                WithdrawStakeRewards: (__ssnaddr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `WithdrawStakeRewards`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "WithdrawStakeRewards");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_WithdrawStakeAmt: signer("WithdrawStakeAmt"),
                WithdrawStakeAmt: (__ssnaddr, __amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `WithdrawStakeAmt`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `amt`,
                                value: __amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "WithdrawStakeAmt");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_CompleteWithdrawal: signer("CompleteWithdrawal"),
                CompleteWithdrawal: (__initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `CompleteWithdrawal`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "CompleteWithdrawal");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_ReDelegateStake: signer("ReDelegateStake"),
                ReDelegateStake: (__ssnaddr, __to_ssn, __amount, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `ReDelegateStake`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `to_ssn`,
                                value: __to_ssn.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `amount`,
                                value: __amount.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "ReDelegateStake");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_AssignStakeReward: signer("AssignStakeReward"),
                AssignStakeReward: (amount, __ssnreward_list, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `AssignStakeReward`,
                        data: [
                            {
                                type: `List (Pair (ByStr20) (Uint128))`,
                                vname: `ssnreward_list`,
                                value: __ssnreward_list.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: amount.value.toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "AssignStakeReward");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_AddFunds: signer("AddFunds"),
                AddFunds: (amount, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `AddFunds`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: amount.value.toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "AddFunds");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_AddSSNAfterUpgrade: signer("AddSSNAfterUpgrade"),
                AddSSNAfterUpgrade: (__ssnaddr, __stake_amt, __rewards, __name, __urlraw, __urlapi, __buff_deposit, __comm, __comm_rewards, __rec_addr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `AddSSNAfterUpgrade`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `stake_amt`,
                                value: __stake_amt.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `rewards`,
                                value: __rewards.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `name`,
                                value: __name.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `urlraw`,
                                value: __urlraw.toSend(),
                            },
                            {
                                type: `String`,
                                vname: `urlapi`,
                                value: __urlapi.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `buff_deposit`,
                                value: __buff_deposit.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `comm`,
                                value: __comm.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `comm_rewards`,
                                value: __comm_rewards.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `rec_addr`,
                                value: __rec_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "AddSSNAfterUpgrade");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_UpdateDeleg: signer("UpdateDeleg"),
                UpdateDeleg: (__ssnaddr, __deleg, __stake_amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `UpdateDeleg`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssnaddr`,
                                value: __ssnaddr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `deleg`,
                                value: __deleg.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `stake_amt`,
                                value: __stake_amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "UpdateDeleg");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateStakeSSNPerCycle: signer("PopulateStakeSSNPerCycle"),
                PopulateStakeSSNPerCycle: (__ssn_addr, __cycle, __totalAmt, __rewards, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateStakeSSNPerCycle`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `totalAmt`,
                                value: __totalAmt.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `rewards`,
                                value: __rewards.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateStakeSSNPerCycle");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateLastWithdrawCycleForDeleg: signer("PopulateLastWithdrawCycleForDeleg"),
                PopulateLastWithdrawCycleForDeleg: (__deleg_addr, __ssn_addr, __cycle, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateLastWithdrawCycleForDeleg`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `deleg_addr`,
                                value: __deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateLastWithdrawCycleForDeleg");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateLastBufDepositCycleDeleg: signer("PopulateLastBufDepositCycleDeleg"),
                PopulateLastBufDepositCycleDeleg: (__deleg_addr, __ssn_addr, __cycle, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateLastBufDepositCycleDeleg`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `deleg_addr`,
                                value: __deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateLastBufDepositCycleDeleg");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateBuffDeposit: signer("PopulateBuffDeposit"),
                PopulateBuffDeposit: (__deleg_addr, __ssn_addr, __cycle, __amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateBuffDeposit`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `deleg_addr`,
                                value: __deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `amt`,
                                value: __amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateBuffDeposit");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateDirectDeposit: signer("PopulateDirectDeposit"),
                PopulateDirectDeposit: (__deleg_addr, __ssn_addr, __cycle, __amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateDirectDeposit`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `deleg_addr`,
                                value: __deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `amt`,
                                value: __amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateDirectDeposit");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateDepositAmtDeleg: signer("PopulateDepositAmtDeleg"),
                PopulateDepositAmtDeleg: (__deleg_addr, __ssn_addr, __amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateDepositAmtDeleg`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `deleg_addr`,
                                value: __deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `amt`,
                                value: __amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateDepositAmtDeleg");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateDelegStakePerCycle: signer("PopulateDelegStakePerCycle"),
                PopulateDelegStakePerCycle: (__deleg_addr, __ssn_addr, __cycle, __amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateDelegStakePerCycle`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `deleg_addr`,
                                value: __deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `amt`,
                                value: __amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateDelegStakePerCycle");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateLastRewardCycle: signer("PopulateLastRewardCycle"),
                PopulateLastRewardCycle: (__cycle, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateLastRewardCycle`,
                        data: [
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateLastRewardCycle");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateCommForSSN: signer("PopulateCommForSSN"),
                PopulateCommForSSN: (__ssn_addr, __cycle, __comm, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateCommForSSN`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `Uint32`,
                                vname: `cycle`,
                                value: __cycle.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `comm`,
                                value: __comm.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateCommForSSN");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateTotalStakeAmt: signer("PopulateTotalStakeAmt"),
                PopulateTotalStakeAmt: (__amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateTotalStakeAmt`,
                        data: [
                            {
                                type: `Uint128`,
                                vname: `amt`,
                                value: __amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateTotalStakeAmt");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulatePendingWithdrawal: signer("PopulatePendingWithdrawal"),
                PopulatePendingWithdrawal: (__ssn_addr, __block_number, __stake, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulatePendingWithdrawal`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `ssn_addr`,
                                value: __ssn_addr.toSend(),
                            },
                            {
                                type: `BNum`,
                                vname: `block_number`,
                                value: __block_number.toSend(),
                            },
                            {
                                type: `Uint128`,
                                vname: `stake`,
                                value: __stake.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulatePendingWithdrawal");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_PopulateDelegSwapRequest: signer("PopulateDelegSwapRequest"),
                PopulateDelegSwapRequest: (__requestor, __new_deleg_addr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `PopulateDelegSwapRequest`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `requestor`,
                                value: __requestor.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `new_deleg_addr`,
                                value: __new_deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "PopulateDelegSwapRequest");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_DrainContractBalance: signer("DrainContractBalance"),
                DrainContractBalance: (__amt, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `DrainContractBalance`,
                        data: [
                            {
                                type: `Uint128`,
                                vname: `amt`,
                                value: __amt.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "DrainContractBalance");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_RequestDelegatorSwap: signer("RequestDelegatorSwap"),
                RequestDelegatorSwap: (__new_deleg_addr, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `RequestDelegatorSwap`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `new_deleg_addr`,
                                value: __new_deleg_addr.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "RequestDelegatorSwap");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_ConfirmDelegatorSwap: signer("ConfirmDelegatorSwap"),
                ConfirmDelegatorSwap: (__requestor, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `ConfirmDelegatorSwap`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `requestor`,
                                value: __requestor.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "ConfirmDelegatorSwap");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_RevokeDelegatorSwap: signer("RevokeDelegatorSwap"),
                RevokeDelegatorSwap: (__initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `RevokeDelegatorSwap`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "RevokeDelegatorSwap");
                            return tx;
                        },
                    };
                },
                /**
                 * returns a signer that given an account will sign transition params in such manner:
                 * ...params, nonce, transition name, contract address
                 * */
                sign_RejectDelegatorSwap: signer("RejectDelegatorSwap"),
                RejectDelegatorSwap: (__requestor, __initiator) => {
                    const transactionData = {
                        ...sig,
                        contractAddress: a.toSend(),
                        contractTransitionName: `RejectDelegatorSwap`,
                        data: [
                            {
                                type: `ByStr20`,
                                vname: `requestor`,
                                value: __requestor.toSend(),
                            },
                            {
                                type: `ByStr20`,
                                vname: `initiator`,
                                value: __initiator.toSend(),
                            },
                        ],
                        amount: new BN(0).toString(),
                    };
                    return {
                        /**
                         * get data needed to perform this transaction
                         * */
                        toJSON: () => transactionData,
                        /**
                         * send the transaction to the blockchain
                         * */
                        send: async () => {
                            const zil = getZil();
                            const gasPrice = await getMinGasPrice(zil);
                            const contract = getContract(zil, a.toSend());
                            const tx = await contract.call(transactionData.contractTransitionName, transactionData.data, {
                                version: getVersion(),
                                amount: new BN(transactionData.amount),
                                gasPrice,
                                gasLimit,
                            }, 33, 1000);
                            txLink(tx, "RejectDelegatorSwap");
                            return tx;
                        },
                    };
                },
            };
        },
    };
};
//# sourceMappingURL=bind.js.map