export const handleValueLimits = (value, min, max) => {
    if (value < min) value = min
    if (value > max) value = max
    return value
}

const utils = {
    handleValueLimits
}

export default utils
