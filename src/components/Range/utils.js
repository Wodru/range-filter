/**
 *
 * checks if the number is within the limits and if not returns the limit
 *
 * @function
 * @param {number} value - value to check
 * @param {number} min - min limit
 * @param {number} max - max limit
 * @returns {number} valid number within bounds
 */
export const handleValueLimits = (value, min, max) => {
    if (value < min) value = min
    if (value > max) value = max
    return value
}

const utils = {
    handleValueLimits
}

export default utils
