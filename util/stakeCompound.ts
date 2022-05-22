import Big from "big.js";

export const compoundStaking = (
    portfolio: Big,
    apy: Big,
    wdFee: Big,
    wdWaitFeePerDay: Big,
    compoundNumber: number,
    numberOfCyclesInAYear: number
) => {
    if (compoundNumber == 0) {
        return portfolio;
    }
    const one = new Big(1);
    const year = new Big(numberOfCyclesInAYear);
    // just the compounding formula
    const noFees = portfolio.mul(
        one.add(apy.div(compoundNumber)).pow(compoundNumber)
    );
    const spacedOutWD = wdFee.add(
        year.div(compoundNumber).mul(wdWaitFeePerDay)
    );
    let k = compoundNumber - 1;
    let feeSum = new Big(1);
    while (k != 0) {
        const fee = one.add(apy.div(k)).pow(k);
        feeSum = feeSum.add(fee);
        k--;
    }
    return noFees.sub(spacedOutWD.mul(feeSum));
};

export const optimalWithdrawal = (
    portfolio: Big,
    apy: Big,
    wdFee: Big,
    wdWaitFeePerDay: Big,
    numberOfCyclesInAYear: number
) => {
    let max = -1;
    let x = 0;

    for (x = 0; x < 365; x++) {
        const res = compoundStaking(
            portfolio,
            apy,
            wdFee,
            wdWaitFeePerDay,
            x,
            numberOfCyclesInAYear
        );
        console.log(res)
        if (res.toNumber() < max) {
            break;
        }
        max = res.toNumber();
    }

    return {
        result: max,
        withdrawEvery: Math.round(numberOfCyclesInAYear / x),
    };
};
