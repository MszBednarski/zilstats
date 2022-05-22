import { Signable } from "./shared";
declare abstract class StringSignable extends Signable {
    value: string;
    constructor(v: string);
}
export declare class BNum extends StringSignable {
    type: string;
    constructor(v: string);
    toHash(): string;
    toSend(): string;
}
export declare class ScillaString extends StringSignable {
    type: string;
    constructor(v: string);
    toHash(): string;
    toSend(): string;
}
export {};
