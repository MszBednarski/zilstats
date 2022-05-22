import { observer } from "mobx-react-lite";
import { Box, Heading, Button, Text, Paragraph, TextInput } from "grommet";
import { useRouter } from "next/router";
import { Hero } from "../components/Hero";
import { addressInput } from "../state/AddressInput";

export default observer(() => {
    const router = useRouter();
    return (
        <Box flex="grow" justify="center">
            <Hero />
            <br />
            <Box gap="medium" align="center">
                <TextInput
                    placeholder={"bech32 or checksummed address"}
                    value={addressInput.addressString}
                    size="xsmall"
                    focusIndicator={false}
                    onChange={(e) =>
                        addressInput.setAddressString(e.target.value)
                    }
                    style={{ fontSize: "0.65rem" }}
                    maxLength={42}
                />
                <Box width="50%">
                    <Button
                        size="small"
                        label={"view address"}
                        color="black"
                        disabled={!addressInput.isValidAddress}
                        onClick={() =>
                            router.push(
                                "/view/[address]",
                                `/view/${addressInput.addressString}`
                            )
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
});
