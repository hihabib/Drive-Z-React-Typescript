export const isEmptyObj = (obj: object): boolean => {
    return 0 === Object.keys(obj).length
}

export const isObject = (obj:object):boolean => {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}