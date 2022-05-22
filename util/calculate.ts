import { BN } from "@zilliqa-js/util";
import { Big } from "big.js";

/**
 * arguments are total stake and total rewards
 */
export interface StakeSsnPerCycle {
    [ssn: string]: { [cycle: string]: { arguments: [string, string] } };
}
/**
 * (* Keeps track of the cycle number when a deleg last withdrew its rewards *)
   (* AddressOfDeleg -> ( AddressOfSSN -> CycleNumberWhenLastWithdrawn) *)
 */
export interface LastWithdrawCycleDeleg {
    [ssn: string]: string;
}
/**
(* AddressOfDeleg -> AddressOfSSN -> EffectCycleNum -> Deposit *)
 */
export interface DelegStakePerCycle {
    [ssn: string]: {
        [cycle: string]: string;
    };
}

export interface BuffDepositDeleg {
    [ssn: string]: {
        [cycle: string]: string;
    };
}

function getTotalStakeAndRewards(
    c: StakeSsnPerCycle,
    ssn: string,
    cycle: string
) {
    const t = c[ssn][cycle].arguments;
    return {
        totalStake: new Big(t[0]),
        totalRewards: new Big(t[1]),
    };
}

export interface UnclaimedReward {
    ssn: string;
    rewards: {
        cycle: string;
        rewards: BN;
    }[];
}

export function calculateRewards(
    lastRewardCycle: string,
    stake_ssn_per_cycle: StakeSsnPerCycle,
    deleg_stake_per_cycle: DelegStakePerCycle,
    lastWithdrawnCycleDeleg: LastWithdrawCycleDeleg,
    buff_deposit_deleg: BuffDepositDeleg
): UnclaimedReward[] {
    const lastRewardCycleNum = parseInt(lastRewardCycle);
    return Object.entries(lastWithdrawnCycleDeleg).map(([ssn, cycleNumber]) => {
        const cycleNumberNum = parseInt(cycleNumber);
        // now retrace the steps to calculate the rewards for each cycle
        // at each step there might be buffered stake to add from the previous cycle
        // make it a carry to the next
        let carryCycle = new Big(0);
        let totalDelegStake = new Big(deleg_stake_per_cycle[ssn][cycleNumber]);
        const res: { cycle: string; rewards: BN }[] = [];
        for (
            let curConsideredCycle = cycleNumberNum;
            curConsideredCycle < lastRewardCycleNum;
            curConsideredCycle++
        ) {
            //add carry to total
            totalDelegStake = totalDelegStake.add(carryCycle);
            //zero the carry or get the next one
            const maybeBuffDeposit =
                buff_deposit_deleg?.[ssn]?.[curConsideredCycle.toString()];
            carryCycle = maybeBuffDeposit
                ? new Big(maybeBuffDeposit)
                : new Big(0);
            const { totalStake, totalRewards } = getTotalStakeAndRewards(
                stake_ssn_per_cycle,
                ssn,
                curConsideredCycle.toString()
            );
            const rewards = totalDelegStake
                .div(totalStake)
                .mul(totalRewards)
                .toFixed(0);
            res.push({
                cycle: curConsideredCycle.toString(),
                rewards: new BN(rewards.toString()),
            });
        }
        return { ssn, rewards: res };
    });
}
