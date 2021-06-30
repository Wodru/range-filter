import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'

export const get = (url) => {
    return axios.get(url)
}

const api = {
    get
}

export default api
