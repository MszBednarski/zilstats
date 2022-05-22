import { useEffect, useRef } from "react";
import { getChart } from "./chart";
import { ChartHolder } from "./ChartHolder";
import { SunburstData } from "./data";

function isClient() {
    return typeof window != "undefined";
}

/**
 * Append the node to a given id of a container in the DOM
 */
function appendChild(id: string, ref: SVGSVGElement) {
    if (isClient()) {
        const box = document.getElementById(id);
        if (box.childNodes.length == 0) {
            box.appendChild(ref);
        } else {
            box.replaceChild(ref, box.childNodes[0]);
        }
    }
}

export function Sunburst({ data }: { data: SunburstData }) {
    const CHART_BOX_ID = "sunburst-box";
    const chart = useRef<SVGSVGElement>();

    useEffect(() => {
        chart.current = getChart(data);
        appendChild(CHART_BOX_ID, chart.current);
    }, [data]);

    return <ChartHolder chartId={CHART_BOX_ID} />;
}
