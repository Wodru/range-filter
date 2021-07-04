import api from "../api"

const ApiLocation = process.env.API_HOST

/**
 * Get the options of the Range component
 * @function
 * @returns {Promise} response
 */
export const getOptions = () => {
    return api.get(ApiLocation + `/options`)
}
