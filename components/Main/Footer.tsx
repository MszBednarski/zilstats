import { Box, Anchor } from "grommet";
import { Github, Chat } from "grommet-icons";
import { useRouter } from "next/router";

export const Footer = () => {
    const router = useRouter();
    return (
        <Box justify="center" direction="row" align="center" gap="large">
            <Anchor
                size="xsmall"
                onClick={() => router.push("/about")}
                label="about"
            />
            <Anchor
                size="xsmall"
                label="telegram"
                href={"https://t.me/joinchat/Co92VSABtyZhMjg0"}
            />
            <Anchor
                size="xsmall"
                reverse
                icon={<Github size="small" />}
                href={"https://github.com/MszBednarski"}
                label="made with love"
            />
        </Box>
    );
};
