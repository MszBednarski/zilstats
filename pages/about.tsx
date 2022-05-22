import { observer } from "mobx-react-lite";
import { Box, Heading, Button, Text, Paragraph, Anchor } from "grommet";
import { config } from "../util/config";
import { Hero } from "../components/Hero";

export default observer(() => {
    return (
        <Box overflow="auto" flex="grow">
            <Box flex="grow" justify="center" pad={{ horizontal: "large" }}>
                <Heading level="3">
                    {"This is a zilliqa porfolio dApp."}
                </Heading>
                <Paragraph>{`Donations are welcome: ${config.feeAddress}`}</Paragraph>
            </Box>
        </Box>
    );
});
