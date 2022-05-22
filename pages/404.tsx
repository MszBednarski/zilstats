import { Box, Button, Paragraph } from "grommet";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();
    return (
        <Box flex="grow" justify="center">
            <Paragraph>404 There was an error!</Paragraph>
            <Button
                color="black"
                label={"Go back"}
                onClick={() => router.push("/")}
            />
        </Box>
    );
}
