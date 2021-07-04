import api from '../api'

const ApiLocation = process.env.API_HOST

/**
 * Get the limits of the Range component
 * @function
 * @returns {Promise} response
 */
export const getLimits = () => {
    return api.get(ApiLocation + `/limits`)
}
