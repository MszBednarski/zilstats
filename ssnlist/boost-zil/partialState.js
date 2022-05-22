import { ByStr20 } from "./signable";
import "isomorphic-fetch";
function addMeta(r) {
    return { ...r, id: "1", jsonrpc: "2.0" };
}
async function sendBatchRPCMethodCalls(b, toUrl) {
    const response = await fetch(toUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(b.map(addMeta)),
    });
    const text = await response.text();
    const result = JSON.parse(text);
    return result;
}
function assignKeys(target, keys, value) {
    let tmp = target;
    let lastKey = keys[keys.length - 1];
    for (let index = 0; index < keys.length - 1; index++) {
        const k = keys[index];
        if (typeof tmp[k] == "undefined") {
            tmp[k] = {};
        }
        tmp = tmp[k];
    }
    tmp[lastKey] = value;
}
function callToValue(call, keys) {
    const result = call.result;
    if (typeof result == "undefined" || result == null) {
        console.warn("Call result for key trail:", keys, "is undefined, this might not be defined in the smart contract!");
        return undefined;
    }
    let tmp = result;
    keys.forEach((k) => (tmp = tmp[k]));
    return tmp;
}
function restoreObject(res, b) {
    if (b.includeInit == "true") {
        const initResult = { original: res[0].result };
        // surgically update the init state to something comprehensible
        res[0].result.forEach((r) => (initResult[r.vname] = r.value));
        res[0].result = initResult;
    }
    const resultObject = {};
    for (const index in res) {
        const call = res[index];
        const meta = b.meta[index];
        assignKeys(resultObject, meta.putFields, callToValue(call, meta.responseFields));
    }
    return resultObject;
}
function passQuery(q, fields, queries, contractAddress) {
    const entries = Object.entries(q);
    if (entries.length == 0) {
        return queries;
    }
    const res = [];
    for (const [field, starOrFields] of entries) {
        if (!starOrFields)
            throw new Error("Pass query: starOrFields undefined");
        if (starOrFields == "*") {
            const allFields = fields.concat(field);
            const firstField = allFields.shift();
            if (!firstField)
                throw new Error("Pass query: firstField undefined");
            res.push({
                query: { params: [contractAddress, firstField, allFields] },
                meta: { fields: [firstField, ...allFields] },
            });
        }
        else {
            res.push(...passQuery(starOrFields, [...fields, field], [], contractAddress));
        }
    }
    return res;
}
function partialQueryToRPC(partial) {
    const { includeInit } = partial;
    const init = includeInit == "true"
        ? [
            addMeta({
                method: "GetSmartContractInit",
                params: [partial.contractAddress.noPrefixed()],
            }),
        ]
        : [];
    const initMeta = includeInit == "true" ? [{ responseFields: [], putFields: ["_init"] }] : [];
    const subStateQueries = passQuery(partial.query, [], [], partial.contractAddress.noPrefixed());
    const queries = [
        ...init,
        ...subStateQueries
            .map((r) => r.query)
            .map((r) => addMeta({ ...r, method: "GetSmartContractSubState" })),
    ];
    const meta = [
        ...initMeta,
        ...subStateQueries.map((r) => ({
            responseFields: r.meta.fields,
            putFields: r.meta.fields,
        })),
    ];
    return { queries, meta, includeInit };
}
export const toAddrKey = (s) => new ByStr20(s).lowerCase();
function cutArray(arr, cuts) {
    const res = [];
    let start = 0;
    for (const cut of cuts) {
        res.push(arr.slice(start, cut + start));
        start += cut;
    }
    return res;
}
export const partialState = (getZil) => async function (...partial) {
    const partialQueryToRpcRes = partial.map((o) => {
        const r = partialQueryToRPC(o);
        return {
            length: r.queries.length,
            toRpc: r,
        };
    });
    const result = await sendBatchRPCMethodCalls(partialQueryToRpcRes.map((p) => p.toRpc.queries).flat(), 
    //@ts-expect-error
    getZil().provider.nodeURL);
    const cut = cutArray(result, partialQueryToRpcRes.map((o) => o.length));
    const restored = cut.map((res, index) => restoreObject(res, partialQueryToRpcRes[index].toRpc));
    return restored;
};
//# sourceMappingURL=partialState.js.map