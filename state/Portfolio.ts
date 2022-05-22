import { makeAutoObservable, runInAction } from "mobx";
import { ByStr20 } from "../ssnlist/boost-zil/signable";
import {
    getZil,
    BNToDisp,
    BNFractionMultiply,
    getNetworkName,
    getVersion,
    BNToInt,
} from "../util";
import { BN } from "@zilliqa-js/zilliqa";
import { getRates } from "../util/rates";
import { config } from "../util/config";
import { SSNList } from "../ssnlist/other/SSNList/build/bind";
import { SunburstData } from "../components/Sunburst/data";
import { calculateRewards, UnclaimedReward } from "../util/calculate";
import { optimalWithdrawal } from "../util/stakeCompound";
import Big from "big.js";

export type Tabs = "rewards" | "overview";

class Portfolio {
    isInit = false;
    tab: Tabs = "overview";
    private address: ByStr20;
    private balance = new BN(0);
    balanceRate = 0;
    private stakes: BN = new BN(0);
    private bufferedStake: BN = new BN(0);
    optimalCycles = 0;
    unclaimedRewards: UnclaimedReward[];
    constructor() {
        makeAutoObservable(this);
    }
    setTab(t: Tabs) {
        this.tab = t;
    }
    private async updateBalance() {
        try {
            const res = await getZil().blockchain.getBalance(
                this.address.toSend()
            );
            runInAction(() => {
                this.balance = new BN(res.result.balance);
            });
        } catch (e) {
            console.error(e);
        }
    }
    private async updateRates() {
        try {
            const res = await getRates();
            runInAction(() => {
                this.balanceRate = res.zilliqa.usd;
            });
        } catch (e) {
            console.error(e);
        }
    }
    private async updateStakes() {
        try {
            const lower = this.address.toSend().toLowerCase();
            const [res] = await SSNList({ getZil, getVersion, getNetworkName })
                .state(
                    {
                        buff_deposit_deleg: { [lower]: "*" },
                        deleg_stake_per_cycle: { [lower]: "*" },
                        last_withdraw_cycle_deleg: {
                            [lower]: "*",
                        },
                        stake_ssn_per_cycle: "*",
                        lastrewardcycle: "*",
                        deposit_amt_deleg: {
                            [lower]: "*",
                        },
                    },
                    "false"
                )
                .get(config.ssnList);
            console.log(res);
            const lastrewardcycle = parseInt(res.lastrewardcycle);
            const bufferPairs = Object.entries(
                res.buff_deposit_deleg[lower]
                    ? res.buff_deposit_deleg[lower]
                    : {}
            )
                .map(([ssn, allBuffers]) => Object.entries(allBuffers))
                .flat()
                .filter(([cycle, amt]) => parseInt(cycle) >= lastrewardcycle)
                .map(([cycle, amt]) => new BN(amt));
            const summed = Object.entries(res.deposit_amt_deleg[lower]).reduce(
                (prev, [ssn, val]) => {
                    return prev.add(new BN(val as string));
                },
                new BN(0)
            );
            const summedBuffered = bufferPairs.reduce(
                (prev, val) => prev.add(val),
                new BN(0)
            );
            const portfolio = new Big(summed.toString()).div(
                new Big(10).pow(12)
            );
            const apy = new Big("0.13");
            const wdFee = new Big("4.708333333");
            const wdWaitFeePerDay = new Big("0.131666667");

            const optimal = optimalWithdrawal(
                portfolio,
                apy,
                wdFee,
                wdWaitFeePerDay,
                461
            );
            runInAction(() => {
                this.stakes = summed.sub(summedBuffered);
                this.bufferedStake = summedBuffered;
                this.optimalCycles = optimal.withdrawEvery;
                this.unclaimedRewards = calculateRewards(
                    res.lastrewardcycle,
                    res.stake_ssn_per_cycle,
                    res.deleg_stake_per_cycle[lower],
                    res.last_withdraw_cycle_deleg[lower],
                    res.buff_deposit_deleg[lower]
                );
            });
        } catch (e) {
            console.error(e);
        }
    }
    get dispBufferedStake() {
        return BNToDisp(this.bufferedStake, 12);
    }
    get dispStakes() {
        return BNToDisp(this.stakes, 12);
    }
    get dispBalance() {
        return BNToDisp(this.balance, 12);
    }
    get dispAddress() {
        return this.address.toBech32();
    }
    get dispRateBalance() {
        return BNFractionMultiply(this.balance, 12, this.balanceRate);
    }
    get dispRateStakes() {
        return BNFractionMultiply(this.stakes, 12, this.balanceRate);
    }
    get dispRateBufferedStake() {
        return BNFractionMultiply(this.bufferedStake, 12, this.balanceRate);
    }
    get dispTotalRate() {
        return BNFractionMultiply(
            this.balance.add(this.stakes).add(this.bufferedStake),
            12,
            this.balanceRate
        );
    }
    get dispTotal() {
        return BNToDisp(
            this.balance.add(this.stakes).add(this.bufferedStake),
            12
        );
    }
    get thereIsBufferedStake() {
        return !this.bufferedStake.eq(new BN(0));
    }
    setAddress(s: string) {
        if (ByStr20.isValid(s)) {
            this.isInit = true;
            this.address = new ByStr20(s);
            // do the init sequence
            this.updateBalance();
            this.updateRates();
            this.updateStakes();
        }
    }
    clear() {
        this.isInit = false;
        this.stakes = new BN(0);
        this.bufferedStake = new BN(0);
        this.balance = new BN(0);
    }

    get sunBurst(): SunburstData {
        return {
            name: `${this.address}`,
            children: [
                {
                    name: "Stake",
                    value: BNToInt(this.stakes, 12),
                },
                { name: "ZIL", value: BNToInt(this.balance, 12) },
            ],
        };
    }
}

export const portfolio = new Portfolio();
