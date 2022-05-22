import { Grommet, grommet as grommetTheme } from "grommet";
import { deepMerge } from "grommet/utils";
import { AppProps } from "next/app";
import Head from "next/head";
import { Main } from "../components/Main";

const desc = "The zilliqa portfolio stats page";
const title = "zilstats";
const twitterUrl = "https://zilstats.com";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="application-name" content={title} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content={title} />
                <meta name="description" content={desc} />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content={twitterUrl} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={desc} />
            </Head>
            <Grommet
                theme={deepMerge(grommetTheme, {
                    global: {
                        font: {
                            family: "Courier",
                        },
                        colors: { text: "#000000", border: "#000000" },
                    },
                    heading: { color: "#000000" },
                })}
                full={true}
            >
                <Main>
                    <Component {...pageProps} />
                </Main>
            </Grommet>
        </>
    );
}
