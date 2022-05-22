import { observer } from "mobx-react-lite";
import { Box, Button, Paragraph, Text } from "grommet";
import { GetServerSideProps } from "next";
import { ByStr20 } from "../../ssnlist/boost-zil/signable";
import { useEffect } from "react";
import { BNFractionMultiply, BNToDisp, notArr } from "../../util";
import { ZilliqaLogo } from "../../components/ZilliqaLogo";
import { portfolio, Tabs } from "../../state/Portfolio";
import { Sunburst } from "../../components/Sunburst";
import { useRouter } from "next/router";
import { BN } from "@zilliqa-js/util";

export default observer(
    (props: { isValid: boolean; address: string; tab: Tabs }) => {
        const router = useRouter();
        const { tab } = router.query;
        useEffect(() => {
            if (tabIsValid(notArr(tab))) {
                //@ts-expect-error
                portfolio.setTab(notArr(tab));
            } else {
                router.query.tab = "overview";
                router.push(router);
            }
        }, [tab]);
        useEffect(() => {
            portfolio.setAddress(props.address);
            return () => portfolio.clear();
        }, []);
        if (!props.isValid) {
            return (
                <Box flex="grow" justify="center">
                    <Paragraph>{`"${props.address}" is an invalid address!`}</Paragraph>
                </Box>
            );
        }
        return (
            <Box
                overflow="auto"
                flex="grow"
                fill="horizontal"
                pad={{ horizontal: "small", bottom: "large" }}
            >
                <Box
                    direction="row"
                    gap="medium"
                    margin={{ top: "small" }}
                    justify="center"
                >
                    <Button
                        plain
                        size="small"
                        label={"overview"}
                        onClick={() => {
                            router.query.tab = "overview";
                            router.push(router);
                        }}
                        color={
                            router.query.tab == "overview" ? "black" : "brand"
                        }
                    />
                    <Button
                        plain
                        size="small"
                        label={"rewards"}
                        onClick={() => {
                            router.query.tab = "rewards";
                            router.push(router);
                        }}
                        color={
                            router.query.tab == "rewards" ? "black" : "brand"
                        }
                    />
                </Box>

                {portfolio.isInit &&
                    (portfolio.tab == "overview" ? (
                        <>
                            <Box align="center" justify="center" fill>
                                <Box width={"80vw"}>
                                    <Sunburst data={portfolio.sunBurst} />
                                </Box>
                            </Box>
                            <Box pad="small" round="7px" fill="horizontal">
                                <Box
                                    gap="small"
                                    direction="row"
                                    justify="center"
                                >
                                    <ZilliqaLogo size="16" />
                                    <Text size="xsmall">{`${portfolio.dispBalance} ZIL - $${portfolio.dispRateBalance}`}</Text>
                                </Box>
                                <Box
                                    gap="small"
                                    direction="row"
                                    justify="center"
                                >
                                    <Text size="xsmall">{`Stake ${portfolio.dispStakes} ZIL - $${portfolio.dispRateStakes}`}</Text>
                                </Box>
                                {portfolio.thereIsBufferedStake && (
                                    <Box
                                        gap="small"
                                        direction="row"
                                        justify="center"
                                    >
                                        <Text size="xsmall">{`Buffered ${portfolio.dispBufferedStake} ZIL - $${portfolio.dispRateBufferedStake}`}</Text>
                                    </Box>
                                )}
                                <Box
                                    gap="small"
                                    direction="row"
                                    justify="center"
                                >
                                    <Text size="xsmall">{`Total: ${portfolio.dispTotal} ZIL - $${portfolio.dispTotalRate}`}</Text>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        portfolio.unclaimedRewards && (
                            <Box
                                align="center"
                                pad="small"
                                flex="grow"
                                justify="center"
                            >
                                {portfolio.unclaimedRewards.map((r) =>
                                    r.rewards.map((i) => (
                                        <Text
                                            size="xsmall"
                                            key={`${r.ssn}, ${i.cycle}`}
                                        >{`Rewards for cycle ${
                                            i.cycle
                                        }: ${BNToDisp(
                                            i.rewards,
                                            12
                                        )} ZIL`}</Text>
                                    ))
                                )}

                                {(() => {
                                    const total = portfolio.unclaimedRewards
                                        .map((i) => i.rewards)
                                        .flat()
                                        .reduce(
                                            (prev, cur) =>
                                                prev.add(cur.rewards),
                                            new BN(0)
                                        );
                                    return (
                                        <>
                                            <br />
                                            <Text size="xsmall">
                                                {`Withdraw every ${portfolio.optimalCycles} cycles to maximize APY.`}
                                            </Text>
                                            <br />
                                            <Text size="xsmall">
                                                {`Total rewards: ${BNToDisp(
                                                    total,
                                                    12
                                                )} ZIL - $${BNFractionMultiply(
                                                    total,
                                                    12,
                                                    portfolio.balanceRate
                                                )}`}
                                            </Text>
                                        </>
                                    );
                                })()}
                            </Box>
                        )
                    ))}
            </Box>
        );
    }
);

function tabIsValid(tab: string) {
    if (tab == "rewards" || tab == "overview") {
        const t: Tabs = tab;
        return true;
    }
    return false;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { address, tab } = context.query;
    return {
        props: {
            tab: tabIsValid(notArr(tab)) ? notArr(tab) : "overview",
            isValid: ByStr20.isValid(notArr(address)),
            address: notArr(address),
        },
    };
};
