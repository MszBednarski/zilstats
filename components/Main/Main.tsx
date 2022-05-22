import { Box } from "grommet";
import { Footer } from "./Footer";
import { Head } from "./Head";

export const Main = ({ children }: { children: JSX.Element }) => (
    <Box align="center" justify="center" fill pad="small">
        <Head />
        {children}
        <Footer />
    </Box>
);
