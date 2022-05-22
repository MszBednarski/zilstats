import { ByStr20 } from "../ssnlist/boost-zil/signable";

export const config = {
    feeAddress: "zil185smd5cwhs6psv78ag0ajegwm9y6mhrnu9pw6l",
    supportedTokens: [
        {
            addr: "zil14pzuzq6v6pmmmrfjhczywguu0e97djepxt8g3e",
            decimals: "15",
            symbol: "gZIL",
            name: "Governance ZIL",
        },
    ],
    ssnList: new ByStr20("zil15lr86jwg937urdeayvtypvhy6pnp6d7p8n5z09"),
};
