import {TError} from "../types/error.ts";

export const isError = (item: any | TError): item is TError => {
    if (item !== null) {
        return 'errorMessage' in item
    }
    return false
}
