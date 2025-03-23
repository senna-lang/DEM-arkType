export const join = (segments, delimiter) => segments.join(delimiter);
export const getPath = (root, path) => {
    let result = root;
    for (const segment of path) {
        if (typeof result !== "object" || result === null)
            return undefined;
        result = result[segment];
    }
    return result;
};
export const intersectUniqueLists = (l, r) => {
    const intersection = [...l];
    for (const item of r)
        if (!l.includes(item))
            intersection.push(item);
    return intersection;
};
export const liftArray = (data) => (Array.isArray(data) ? data : [data]);
/**
 * Splits an array into two arrays based on the result of a predicate
 *
 * @param predicate - The guard function used to determine which items to include.
 * @returns A tuple containing two arrays:
 * 				- the first includes items for which `predicate` returns true
 * 				- the second includes items for which `predicate` returns false
 *
 * @example
 * const list = [1, "2", "3", 4, 5];
 * const [numbers, strings] = spliterate(list, (x) => typeof x === "number");
 * // Type: number[]
 * // Output: [1, 4, 5]
 * console.log(evens);
 * // Type: string[]
 * // Output: ["2", "3"]
 * console.log(odds);
 */
export const spliterate = (arr, predicate) => {
    const result = [[], []];
    for (const item of arr) {
        if (predicate(item))
            result[0].push(item);
        else
            result[1].push(item);
    }
    return result;
};
export const ReadonlyArray = Array;
export const includes = (array, element) => array.includes(element);
export const range = (length, offset = 0) => [...new Array(length)].map((_, i) => i + offset);
/**
 * Adds a value or array to an array, returning the concatenated result
 */
export const append = (to, value, opts) => {
    if (to === undefined) {
        return (value === undefined ? []
            : Array.isArray(value) ? value
                : [value]);
    }
    if (opts?.prepend) {
        if (Array.isArray(value))
            to.unshift(...value);
        else
            to.unshift(value);
    }
    else {
        if (Array.isArray(value))
            to.push(...value);
        else
            to.push(value);
    }
    return to;
};
/**
 * Concatenates an element or list with a readonly list
 */
export const conflatenate = (to, elementOrList) => {
    if (elementOrList === undefined || elementOrList === null)
        return to ?? [];
    if (to === undefined || to === null)
        return liftArray(elementOrList);
    return to.concat(elementOrList);
};
/**
 * Concatenates a variadic list of elements or lists with a readonly list
 */
export const conflatenateAll = (...elementsOrLists) => elementsOrLists.reduce(conflatenate, []);
/**
 * Appends a value or concatenates an array to an array if it is not already included, returning the array
 */
export const appendUnique = (to, value, opts) => {
    if (to === undefined)
        return Array.isArray(value) ? value : [value];
    const isEqual = opts?.isEqual ?? ((l, r) => l === r);
    liftArray(value).forEach(v => {
        if (!to.some(existing => isEqual(existing, v)))
            to.push(v);
    });
    return to;
};
export const groupBy = (array, discriminant) => array.reduce((result, item) => {
    const key = item[discriminant];
    result[key] = append(result[key], item);
    return result;
}, {});
export const arrayEquals = (l, r, opts) => l.length === r.length &&
    l.every(opts?.isEqual ?
        (lItem, i) => opts.isEqual(lItem, r[i])
        : (lItem, i) => lItem === r[i]);
