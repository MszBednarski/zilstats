import { Box, Button, Anchor, Text } from "grommet";
import { Connect, Link } from "grommet-icons";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { portfolio } from "../../state/Portfolio";

export const Head = observer(() => {
    const router = useRouter();
    return (
        <Box
            justify="between"
            direction="row"
            align="center"
            gap="small"
            pad={{ top: "small", horizontal: "small" }}
            fill="horizontal"
        >
            <Box pad={{ horizontal: "small" }}>
                <Button
                    color="black"
                    label={"zilstats"}
                    onClick={() => router.push("/")}
                    plain
                />
                {portfolio.isInit && (
                    <Text size="xsmall">{portfolio.dispAddress}</Text>
                )}
            </Box>
        </Box>
    );
});
