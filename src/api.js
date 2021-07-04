import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'

/**
 * Build get request with url
 * @function
 * @param {string} url - url to get request
 * @returns {Promise} response
 */
export const get = (url) => {
    return axios.get(url)
}

const api = {
    get
}

export default api
