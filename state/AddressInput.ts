import { makeAutoObservable } from "mobx";
import { ByStr20 } from "../ssnlist/boost-zil/signable";

class AddressInput {
    addressString: string = "";
    constructor() {
        makeAutoObservable(this);
    }
    setAddressString(s: string) {
        this.addressString = s;
    }
    get isValidAddress() {
        return ByStr20.isValid(this.addressString);
    }
}

export const addressInput = new AddressInput();
