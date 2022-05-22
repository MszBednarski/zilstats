import { Box } from "grommet";

export const ChartHolder = ({ chartId }: { chartId: string }) => {
    return <Box id={chartId} height={{ max: "50vh" }} />;
};
